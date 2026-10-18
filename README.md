# Bithin Krishna Radhakrishnan — Cybersecurity Portfolio

A single-page cybersecurity portfolio built with **plain HTML, CSS and vanilla JavaScript**.
No frameworks, no build step, no database, no dependencies — it runs by double-clicking
`index.html` and can be hosted for free on any static host.

It has a cinematic "Ghost in the Shell × Tron/Daft Punk × Pink Floyd" visual style:
particle network background, cascading data streams, glitch typography, a prism rainbow
gradient, 3D-tilt cards and neon glow — all keyboard-accessible and with reduced-motion support.

---

## Project structure

```
portfolio/
├── index.html          ← all the content lives here (edit this)
├── css/
│   └── styles.css      ← colours, fonts and all the effects
├── js/
│   └── script.js       ← animations & interactivity
├── assets/             ← put images here (headshot, project screenshots)
└── README.md
```

---

## How to run it locally

1. Open the `portfolio` folder.
2. Double-click `index.html`.
3. It opens in your default browser. Done — no server needed.

(Optional) To serve it like a real site: `python -m http.server` inside the folder,
then open `http://localhost:8000`.

---

## How to edit the site (plain-language guide)

Everything you need to change is inside **`index.html`**, and it's marked with big
comment banners like `<!-- MY NAME -->`, `<!-- PROJECTS -->`, `<!-- SKILLS -->`, etc.

### 1. Change your name
In `index.html`, find `<!-- MY NAME -->` inside the **HERO SECTION** and edit the
`<h1>` text (there are two places: the visible text and the `data-text` attribute —
keep them identical so the glitch effect works).

### 2. Change your headline / typing words
In `js/script.js`, find the `roles` array near the top:

```js
var roles = [
  "Cybersecurity Graduate",
  "Aspiring SOC Analyst",
  ...
];
```

Add, remove or reorder the words. The hero types them out automatically.

### 3. Update your About section
In `index.html`, find the `<!-- ABOUT ME -->` banner and edit the `<p>` paragraphs.
Keep it to 2–4 short sentences.

### 4. Add another project
Find `<!-- PROJECTS -->` in `index.html`. Each project is a `<details>` card.
Copy any existing card (from `<!-- PROJECT 1 -->` to its closing `</details>`),
paste it before the `</div>` that closes `.projects__grid`, then edit:
- the domain badge, title, description, tech tags, and the story fields
  (Challenge → Environment → What I Built → Security Concepts → Result → What I Learned).

### 5. Update skills
Find `<!-- SKILLS -->` and edit the tags inside each `<ul class="tags">` block.
Only list skills you actually have.

### 6. Add / remove certifications
Find `<!-- CERTIFICATIONS -->`. Formal certs go under "Formal Certifications";
courses/training go under "Training & Courses". Never list something you haven't earned.

### 7. Update social / contact links
Find `<!-- CONTACT / CONNECT -->` and the `<!-- MY PRIMARY LINKS -->` buttons in the hero.
Replace `https://github.com/BithinR` and `https://www.linkedin.com/in/bkr95` and the
email `rbithin10@gmail.com` with your own. Your phone number is intentionally **not**
published — add it only if you want it public.

### 8. Replace / add images
Put images in the `assets/` folder and reference them with `src="assets/your-image.png"`.
Currently the site uses no images (pure CSS/canvas), but you can add a headshot to the
hero or screenshots to the project cards.

---

## How to change the look (colours / effects)

Open `css/styles.css` and edit the `:root { ... }` block at the top:

- `--cyan`, `--magenta`, `--violet`, `--gold` — the neon accent colours
- `--prism` — the rainbow gradient (Pink Floyd style)
- `--font-mono`, `--font-sans` — the fonts

To make the effects calmer, edit the `@media (prefers-reduced-motion: reduce)` block
at the bottom of `styles.css`, or remove individual canvas effects in `js/script.js`.

---

## How to publish it for free

This is a static site, so any static host works:

- **GitHub Pages** — push the `portfolio` folder to a repo and enable Pages.
- **Netlify Drop** — drag the `portfolio` folder onto netlify.com.
- **Cloudflare Pages** — connect the folder or repo.

Make sure `index.html`, `css/` and `js/` stay together.

---

## Privacy & security notes

- No trackers, no ads, no cookies, no external scripts.
- External links open in a new tab with `rel="noopener noreferrer"`.
- No form collects data — the contact buttons just link to your email/socials.
