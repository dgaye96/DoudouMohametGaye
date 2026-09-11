/**
 * Generates the static French pages under /fr/ by replaying the runtime
 * dictionary from js/i18n.js against the English HTML. Run: npm run build:fr
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'fr');
const ORIGIN = 'https://doudoumohametgaye.com';
const PAGES = ['index.html', 'about.html', 'experience.html', 'projects.html', 'contact.html'];

const { FR, CONTEXT } = (() => {
  const source = fs.readFileSync(path.join(ROOT, 'js', 'i18n.js'), 'utf8');
  const end = source.indexOf('const originals = new WeakMap();');
  if (end === -1) throw new Error('Unable to locate the end of the i18n dictionary.');
  return new Function(`${source.slice(0, end)} return { FR, CONTEXT };`)();
})();

const normalize = text => text.trim().replace(/\s+/g, ' ');

const lookup = value => (FR[value] !== undefined ? FR[value] : FR[normalize(value)]);

const contextLookup = (node, value) => {
  const parent = node.parentElement;
  if (!parent) return undefined;
  const key = normalize(value);
  for (const entry of CONTEXT) {
    if (entry.map[key] !== undefined && parent.closest(entry.selector)) return entry.map[key];
  }
  return undefined;
};

const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT']);

const translateText = document => {
  const walker = document.createTreeWalker(document.body, 4 /* SHOW_TEXT */);
  const nodes = [];
  while (walker.nextNode()) {
    const parent = walker.currentNode.parentElement;
    if (!parent || SKIP.has(parent.tagName)) continue;
    nodes.push(walker.currentNode);
  }
  nodes.forEach(node => {
    const original = node.nodeValue;
    if (!normalize(original)) return;
    const translation = contextLookup(node, original) ?? lookup(original);
    if (translation === undefined) return;
    node.nodeValue = original.replace(normalize(original), translation);
  });
};

const translateAttributes = document => {
  document.querySelectorAll('[aria-label],[alt],[placeholder]').forEach(el => {
    ['aria-label', 'alt', 'placeholder'].forEach(name => {
      const current = el.getAttribute(name);
      if (current === null) return;
      const translation = lookup(current);
      if (translation !== undefined) el.setAttribute(name, translation);
    });
  });
};

const isExternal = value => /^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(value);

const rewritePaths = document => {
  document.querySelectorAll('[href],[src]').forEach(el => {
    ['href', 'src'].forEach(name => {
      const value = el.getAttribute(name);
      if (value === null || isExternal(value)) return;
      // Page links stay relative so they resolve to their French counterpart.
      if (PAGES.includes(value.split('#')[0])) return;
      el.setAttribute(name, `../${value}`);
    });
  });
};

const setAlternates = (document, page) => {
  const enUrl = `${ORIGIN}/${page === 'index.html' ? '' : page}`;
  const frUrl = `${ORIGIN}/fr/${page === 'index.html' ? '' : page}`;
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', frUrl);
  document.querySelectorAll('link[rel="alternate"]').forEach(el => el.remove());
  [['en', enUrl], ['fr', frUrl], ['x-default', enUrl]].forEach(([lang, href]) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', lang);
    link.setAttribute('href', href);
    document.head.appendChild(link);
  });
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', frUrl);
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) ogLocale.setAttribute('content', 'fr_FR');
};

const translateHead = document => {
  const titleFr = lookup(document.title);
  if (titleFr !== undefined) document.title = titleFr;
  ['meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:description"]'].forEach(selector => {
    const meta = document.querySelector(selector);
    if (!meta) return;
    const translation = lookup(meta.getAttribute('content'));
    if (translation !== undefined) meta.setAttribute('content', translation);
  });
};

fs.mkdirSync(OUT_DIR, { recursive: true });

PAGES.forEach(page => {
  const dom = new JSDOM(fs.readFileSync(path.join(ROOT, page), 'utf8'));
  const { document } = dom.window;

  document.documentElement.setAttribute('lang', 'fr');
  document.documentElement.dataset.root = '../';

  translateText(document);
  translateAttributes(document);
  translateHead(document);
  rewritePaths(document);
  setAlternates(document, page);

  fs.writeFileSync(path.join(OUT_DIR, page), `<!doctype html>\n${document.documentElement.outerHTML}\n`, 'utf8');
  console.log(`fr/${page}`);
});
