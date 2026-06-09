# Chris Martuza — Personal Website

## Setup (one time only)

You need [Node.js](https://nodejs.org) installed. If you don't have it, download the LTS version from nodejs.org.

Then in your terminal, navigate to this folder and run:

```
npm install
```

## Start live reload

```
npm start
```

This opens your browser automatically at `http://localhost:3000`.
Every time you save `index.html`, the browser refreshes instantly.

Press `Ctrl + C` in the terminal to stop the server.

## File structure

```
martuza-site/
├── index.html      ← everything: HTML, CSS, and JS are all in here
├── resume.pdf      ← drop your resume PDF here (must be named resume.pdf)
├── package.json
└── README.md
```

## Editing tips

Open `index.html` in VS Code (free at code.visualstudio.com) for syntax
highlighting and color-coded sections. The file is organized as:

- Line ~11   → CSS (inside <style> tags)
- Line ~220  → HTML content
- Line ~960  → JavaScript (inside <script> tags)
