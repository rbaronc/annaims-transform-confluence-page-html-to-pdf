# ANNAIMS - Transform HTML to PDF

Node server that accepts HTML (including pages with JavaScript) and returns the rendered PDF as a base64-encoded string. Puppeteer (headless Chrome) renders the page so all scripts execute before the PDF is generated.

## Setup

```bash
npm install
```

If Puppeteer install fails (e.g. EPERM on Windows), run the command again or install outside the sandbox.

## Run

```bash
npm start
```

Server listens on port 3005.

## API

**POST** `/transform`

- **Body**: raw HTML as `text/plain` / `text/html`, or JSON `{ "html": "..." }`.
- **Response**: JSON `{ "pdf": "<base64>" }` — decode with `Buffer.from(base64String, 'base64')` to get the PDF bytes.

## How it works

[Puppeteer](https://pptr.dev/) launches headless Chrome, loads the HTML via `page.setContent()`, waits for scripts to execute, then calls `page.pdf()` to produce the PDF buffer. The buffer is returned as base64 in the JSON response — nothing is written to disk.
