# Doudou Mohamet GAYE — Portfolio

A lightweight, multi-page personal portfolio for Doudou Mohamet GAYE, Digital Impact Associate specializing in AI, digital transformation, automation, data solutions and Power Platform.

## Run locally

This is a static HTML/CSS/JavaScript site. Open `index.html` directly in a browser, or serve the folder with any static server:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Structure

- `index.html` — signature homepage and Digital Brain
- `about.html` — professional perspective, expertise domains, education and research
- `experience.html` — experience timeline and achievements
- `projects.html` — project case studies
- `contact.html` — contact details
- `fr/` — generated French pages (do not edit by hand)
- `css/` — shared design system, responsive rules and motion
- `js/` — theme, navigation, interactive components and the FR dictionary (`js/i18n.js`)
- `tools/build-fr.js` — generates `fr/` from the English pages
- `assets/documents/` — optional CV location

The contact page links directly to email, phone and social profiles; no form or backend is used.

## French pages

French is served as real URLs under `/fr/` with `hreflang` alternates, so search engines index both languages. After changing any English page or the dictionary in `js/i18n.js`, regenerate and commit the output:

```powershell
npm install
npm run build:fr
```
