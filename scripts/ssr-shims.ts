const store = new Map<string, string>();
const g = globalThis as Record<string, unknown>;
g.window = globalThis;
g.localStorage = {
  getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
  setItem: (k: string, v: string) => void store.set(k, String(v)),
  removeItem: (k: string) => void store.delete(k),
};
g.document = {
  title: '',
  querySelector: () => null,
  createElement: () => ({ style: {} }),
  head: { appendChild: () => {} },
  getElementById: () => null,
  documentElement: { scrollHeight: 2000, style: {} },
};
try { g.navigator = {}; } catch { /* node >=21 has a read-only navigator */ }
g.IntersectionObserver = class {
  observe() {}
  disconnect() {}
  unobserve() {}
};
g.matchMedia = () => ({ matches: false, addListener: () => {}, removeListener: () => {} });
g.scrollTo = () => {};
g.addEventListener = () => {};
g.removeEventListener = () => {};
g.location = { href: 'http://localhost/', origin: 'http://localhost' };
export {};
