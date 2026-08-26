# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static personal portfolio site (HTML/CSS/JS, no build step, no framework, no package manager). Single page (`index.html`) with sections: hero, about, skills, projects, contact.

## Running locally

```
python -m http.server 5500
```

Then open `http://localhost:5500`. Do **not** open `index.html` directly via `file://` — the GitHub API fetch in `js/github.js` will fail under that origin.

There is no build, lint, or test tooling in this repo (no `package.json`). Changes are verified by reloading the page in a browser.

## Architecture

Three plain `<script>` tags load in order at the bottom of `index.html`, each with a distinct responsibility, communicating via a global `t()` function and a `langchange` DOM event:

- **`js/i18n.js`** — owns the `translations` object (es/en) and the current-language state (`currentLang`, persisted in `localStorage`). Exposes `t(key)` (dotted-path lookup, e.g. `t('projects.viewRepo')`) and `applyTranslations(lang)`, which updates all `[data-i18n]` elements and fires `langchange`. Must load first since `main.js` and `github.js` call `t()` during initialization.
- **`js/github.js`** — fetches the live project list from the GitHub REST API (`api.github.com/users/luisruiiz/repos`), filters out forks, sorts by stars then recency, caches the result in `cachedRepos`, and renders project cards into `#projectsGrid`. Re-renders from cache (no re-fetch) on `langchange`.
- **`js/main.js`** — everything else: scroll effects (navbar, progress bar, active-nav-link via `IntersectionObserver`), the hero typewriter effect (re-runs on `langchange` since role strings are localized), mobile menu, scroll-reveal animations, back-to-top, and the contact form submit handler.

**Adding UI text**: add the key to both `es` and `en` blocks in `js/i18n.js`, then reference it with `data-i18n="section.key"` in `index.html` (static text) or `t('section.key')` in JS (dynamic text, e.g. project card labels).

**Content that needs real values before publishing** (see `README.md` for full detail, in Spanish):
- Contact form `action="https://formspree.io/f/YOUR_FORM_ID"` in `index.html` — the form intentionally short-circuits with an error message while `YOUR_FORM_ID` is still the placeholder (see `initContactForm` in `js/main.js`).
- LinkedIn URL appears twice in `index.html`.
- `.avatar-placeholder` ("LR") is a stand-in for a real photo.
- GitHub username is hardcoded as `GITHUB_USERNAME` in `js/github.js` (currently `luisruiiz`, matching the `origin` remote).

## Deployment

No backend required — deploy as static files (GitHub Pages, Netlify, Vercel, or any static host).
