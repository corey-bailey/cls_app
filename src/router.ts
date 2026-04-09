type PageRenderer = (container: HTMLElement) => void;

const routes: Record<string, PageRenderer> = {};
let contentEl: HTMLElement | null = null;

export function registerRoute(path: string, renderer: PageRenderer): void {
  routes[path] = renderer;
}

export function navigate(path: string): void {
  window.location.hash = `#/${path}`;
}

export function currentRoute(): string {
  const hash = window.location.hash.replace('#/', '') || 'home';
  return hash;
}

export function initRouter(container: HTMLElement): void {
  contentEl = container;

  const render = (): void => {
    if (!contentEl) return;
    const route = currentRoute();
    const renderer = routes[route];
    if (renderer) {
      contentEl.innerHTML = '';
      renderer(contentEl);
    } else {
      // Fallback to home
      navigate('home');
    }
  };

  window.addEventListener('hashchange', render);
  render();
}
