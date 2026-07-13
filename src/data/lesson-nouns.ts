import type { LessonNoun } from './types.ts';

/**
 * Nouns from the Урок 12 chart «Пары глаголов НСВ — СВ». Each chart row reads
 * imperfective — perfective — object; the verbs live in the aspect-pair decks,
 * so these decks drill the objects as plain vocabulary. Card front is the
 * dictionary (nominative) form; the back shows the English plus the chart
 * collocation so the noun stays tied to its verbs.
 */

export interface NounDeck {
  readonly id: string;
  readonly label: string;
  readonly nouns: readonly LessonNoun[];
}

/** SRS key for a lesson-noun card — `ln-` namespace keeps it clear of `w<rank>` and `ap-`. */
export function nounKey(id: string): string {
  return `ln-${id}`;
}

const THING_NOUNS: readonly LessonNoun[] = [
  { id: 'kniga', russian: 'кни́га', english: 'book', usage: 'брать / взять кни́гу в библиоте́ке' },
  { id: 'biblioteka', russian: 'библиоте́ка', english: 'library', usage: 'взять кни́гу в библиоте́ке' },
  { id: 'magnitofon', russian: 'магнитофо́н', english: 'tape recorder', usage: 'включа́ть / включи́ть магнитофо́н' },
  { id: 'professiya', russian: 'профе́ссия', english: 'profession', usage: 'выбира́ть / вы́брать профе́ссию' },
  { id: 'svet', russian: 'свет', english: 'light', usage: 'выключа́ть / вы́ключить свет' },
  { id: 'uzhin', russian: 'у́жин', english: 'dinner, supper', usage: 'гото́вить / пригото́вить у́жин' },
  { id: 'domashnee-zadanie', russian: 'дома́шнее зада́ние', english: 'homework', usage: 'де́лать / сде́лать дома́шнее зада́ние' },
  { id: 'buterbrod', russian: 'бутербро́д', english: 'sandwich', usage: 'есть / съесть бутербро́д' },
  { id: 'nomer', russian: 'но́мер', english: 'room (in a hotel)', usage: 'зака́зывать / заказа́ть но́мер в гости́нице' },
  { id: 'gostinitsa', russian: 'гости́ница', english: 'hotel', usage: 'заказа́ть но́мер в гости́нице' },
  { id: 'okno', russian: 'окно́', english: 'window', usage: 'закрыва́ть / закры́ть окно́' },
  { id: 'ruchka', russian: 'ру́чка', english: 'pen', usage: 'иска́ть / найти́ ру́чку' },
  { id: 'oshibka', russian: 'оши́бка', english: 'mistake', usage: 'исправля́ть / испра́вить оши́бку' },
  { id: 'dengi', russian: 'де́ньги', english: 'money', usage: 'меня́ть / поменя́ть де́ньги · плати́ть де́ньги за кни́гу', note: 'plural only' },
  { id: 'posuda', russian: 'посу́да', english: 'dishes', usage: 'мыть / вы́мыть посу́ду', note: 'collective singular' },
  { id: 'problema', russian: 'пробле́ма', english: 'problem', usage: 'обсужда́ть / обсуди́ть пробле́му' },
  { id: 'dver', russian: 'дверь', english: 'door', usage: 'открыва́ть / откры́ть дверь', note: 'feminine' },
  { id: 'tekst', russian: 'текст', english: 'text', usage: 'переводи́ть / перевести́ текст' },
  { id: 'pesnya', russian: 'пе́сня', english: 'song', usage: 'петь / спеть пе́сню' },
  { id: 'sok', russian: 'сок', english: 'juice', usage: 'пить / вы́пить сок' },
  { id: 'grammatika', russian: 'грамма́тика', english: 'grammar', usage: 'повторя́ть / повтори́ть грамма́тику' },
  { id: 'produkty', russian: 'проду́кты', english: 'groceries', usage: 'покупа́ть / купи́ть проду́кты', note: 'usually plural' },
  { id: 'pismo', russian: 'письмо́', english: 'letter', usage: 'получи́ть письмо́ · написа́ть письмо́ отцу́' },
  { id: 'dush', russian: 'душ', english: 'shower', usage: 'принима́ть / приня́ть душ' },
  { id: 'lekarstvo', russian: 'лека́рство', english: 'medicine', usage: 'принима́ть / приня́ть лека́рство' },
  { id: 'uchebnik', russian: 'уче́бник', english: 'textbook', usage: 'приноси́ть / принести́ уче́бник' },
  { id: 'uprazhnenie', russian: 'упражне́ние', english: 'exercise', usage: 'проверя́ть / прове́рить упражне́ние' },
  { id: 'risunok', russian: 'рису́нок', english: 'drawing, picture', usage: 'рисова́ть / нарисова́ть рису́нок' },
  { id: 'odezhda', russian: 'оде́жда', english: 'clothes', usage: 'стира́ть / постира́ть оде́жду' },
  { id: 'dom', russian: 'дом', english: 'house', usage: 'стро́ить / постро́ить дом' },
  { id: 'klyuch', russian: 'ключ', english: 'key', usage: 'теря́ть / потеря́ть ключ' },
  { id: 'komnata', russian: 'ко́мната', english: 'room', usage: 'убира́ть / убра́ть ко́мнату' },
  { id: 'slovo', russian: 'сло́во', english: 'word', usage: 'учи́ть / вы́учить но́вые слова́' },
  { id: 'gazeta', russian: 'газе́та', english: 'newspaper', usage: 'чита́ть / прочита́ть газе́ту' },
  { id: 'adres', russian: 'а́дрес', english: 'address', usage: 'забы́ть а́дрес · сказа́ть а́дрес дру́гу' },
  { id: 'khleb', russian: 'хлеб', english: 'bread', usage: 'забы́ть купи́ть хлеб' },
  { id: 'zadacha', russian: 'зада́ча', english: 'problem, task', usage: 'реша́ть / реши́ть зада́чу' },
];

const PEOPLE_NOUNS: readonly LessonNoun[] = [
  { id: 'sosed', russian: 'сосе́д', english: 'neighbor', usage: 'буди́ть / разбуди́ть сосе́да' },
  { id: 'prepodavatel', russian: 'преподава́тель', english: 'teacher, instructor', usage: 'ви́деть / уви́деть преподава́теля', note: 'masculine' },
  { id: 'sestra', russian: 'сестра́', english: 'sister', usage: 'встреча́ть / встре́тить сестру́' },
  { id: 'podruga', russian: 'подру́га', english: 'friend (female)', usage: 'ждать / подожда́ть подру́гу' },
  { id: 'drug', russian: 'друг', english: 'friend', usage: 'поздра́вить дру́га с днём рожде́ния · встре́титься с дру́гом' },
  { id: 'den-rozhdeniya', russian: 'день рожде́ния', english: 'birthday', usage: 'поздравля́ть / поздра́вить с днём рожде́ния' },
  { id: 'devushka', russian: 'де́вушка', english: 'girl, young woman', usage: 'пригласи́ть де́вушку в го́сти · договори́ться с де́вушкой' },
  { id: 'direktor', russian: 'дире́ктор', english: 'director', usage: 'спроси́ть дире́ктора · отпра́вить факс дире́ктору' },
  { id: 'slovar', russian: 'слова́рь', english: 'dictionary', usage: 'дать слова́рь студе́нту', note: 'masculine' },
  { id: 'student', russian: 'студе́нт', english: 'student', usage: 'дать слова́рь студе́нту' },
  { id: 'otets', russian: 'оте́ц', english: 'father', usage: 'написа́ть письмо́ отцу́' },
  { id: 'faks', russian: 'факс', english: 'fax', usage: 'отпра́вить факс дире́ктору' },
  { id: 'roditeli', russian: 'роди́тели', english: 'parents', usage: 'звони́ть / позвони́ть роди́телям', note: 'plural' },
];

const PLACE_NOUNS: readonly LessonNoun[] = [
  { id: 'park', russian: 'парк', english: 'park', usage: 'гуля́ть / погуля́ть в па́рке' },
  { id: 'more', russian: 'мо́ре', english: 'sea', usage: 'отдыха́ть / отдохну́ть на мо́ре' },
  { id: 'bilet', russian: 'биле́т', english: 'ticket', usage: 'купи́ть биле́ты' },
  { id: 'tennis', russian: 'те́ннис', english: 'tennis', usage: 'игра́ть / поигра́ть в те́ннис' },
  { id: 'gitara', russian: 'гита́ра', english: 'guitar', usage: 'игра́ть на гита́ре' },
  { id: 'teatr', russian: 'теа́тр', english: 'theater', usage: 'верну́ться из теа́тра' },
  { id: 'obshchezhitie', russian: 'общежи́тие', english: 'dormitory', usage: 'возвраща́ться / верну́ться в общежи́тие' },
  { id: 'urok', russian: 'уро́к', english: 'lesson, class', usage: 'опа́здывать / опозда́ть на уро́к' },
];

export const NOUN_DECKS: readonly NounDeck[] = [
  { id: 'things', label: 'Things · что?', nouns: THING_NOUNS },
  { id: 'people', label: 'People · кого́? кому́?', nouns: PEOPLE_NOUNS },
  { id: 'places', label: 'Places · где? куда́?', nouns: PLACE_NOUNS },
];
