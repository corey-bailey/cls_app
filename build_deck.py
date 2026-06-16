#!/usr/bin/env python3
"""Build a shareable Anki .apkg from the frequency TSV.

Card layout (rich):
  Front:  Russian word (with stress mark)
  Back:   English translation, part of speech, gender/aspect note, frequency rank

Cards stay in frequency order (most -> least used) via the Rank field so the
deck reviews in that sequence when sorted by 'Position'/added order.
"""
import csv
import genanki

TSV_PATH = "russian-1000-frequency.tsv"
OUT_PATH = "Russian-1000-Most-Common.apkg"

# Stable, hand-picked IDs so re-running updates the same deck instead of
# creating duplicates on re-import.
MODEL_ID = 1607392319
DECK_ID = 2059400110

model = genanki.Model(
    MODEL_ID,
    "Russian Frequency (Rich)",
    fields=[
        {"name": "Rank"},
        {"name": "Russian"},
        {"name": "English"},
        {"name": "POS"},
        {"name": "Notes"},
    ],
    templates=[
        {
            "name": "RU -> EN",
            "qfmt": '<div class="word">{{Russian}}</div>',
            "afmt": (
                '{{FrontSide}}<hr id="answer">'
                '<div class="english">{{English}}</div>'
                '<div class="meta">{{POS}}{{#Notes}} &middot; {{Notes}}{{/Notes}}</div>'
                '<div class="rank">#{{Rank}} most common</div>'
            ),
        },
    ],
    css="""
.card { font-family: -apple-system, Helvetica, Arial, sans-serif;
        text-align: center; background: #fbfbfb; color: #1a1a1a; }
.word { font-size: 46px; font-weight: 600; margin: 24px 0; }
.english { font-size: 28px; margin: 14px 0; }
.meta { font-size: 16px; color: #666; }
.rank { font-size: 13px; color: #aaa; margin-top: 18px; }
hr#answer { border: 0; border-top: 1px solid #ddd; margin: 18px 0; }
""",
)

deck = genanki.Deck(DECK_ID, "Russian: 1000 Most Common Words")

with open(TSV_PATH, encoding="utf-8") as f:
    reader = csv.DictReader(f, delimiter="\t")
    count = 0
    for row in reader:
        deck.add_note(
            genanki.Note(
                model=model,
                fields=[
                    row["Rank"].strip(),
                    row["Russian"].strip(),
                    row["English"].strip(),
                    row["POS"].strip(),
                    (row.get("Notes") or "").strip(),
                ],
                # Force-stable GUID per rank so re-imports update, not duplicate.
                guid=genanki.guid_for(f"ru-freq-{row['Rank'].strip()}"),
            )
        )
        count += 1

genanki.Package(deck).write_to_file(OUT_PATH)
print(f"Wrote {OUT_PATH} with {count} cards.")
