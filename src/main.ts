import './style.css';
import { registerRoute, initRouter } from './router.ts';
import { renderNav } from './components/nav.ts';
import { initTTS } from './tts.ts';
import { renderHome } from './pages/home.ts';
import { renderPrep } from './pages/prep.ts';
import { renderPhrases } from './pages/phrases.ts';
import { renderMindset } from './pages/mindset.ts';
import { renderDailyPlanPage } from './pages/daily-plan.ts';

const app = document.getElementById('app')!;

// Create content container
const content = document.createElement('main');
content.className = 'page-content';
app.appendChild(content);

// Register routes
registerRoute('home', renderHome);
registerRoute('plan', renderDailyPlanPage);
registerRoute('prep', renderPrep);
registerRoute('phrases', renderPhrases);
registerRoute('mindset', renderMindset);

// Initialize
initTTS();
renderNav(app);
initRouter(content);
