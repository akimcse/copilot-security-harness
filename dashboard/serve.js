#!/usr/bin/env node
'use strict';
// Zero-dependency launcher: serves the dashboard + live guardrail.log, opens browser.
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const root = __dirname;
const logSrc = path.join(root, '..', 'logs', 'guardrail.log');
const port = Number(process.env.PORT) || 8765;
const mime = { '.html': 'text/html; charset=utf-8', '.log': 'text/plain; charset=utf-8' };

const server = http.createServer((req, res) => {
  let f = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  // Always serve the freshest guardrail.log from logs/ when present.
  if (f === '/guardrail.log' && fs.existsSync(logSrc)) {
    res.writeHead(200, { 'Content-Type': mime['.log'] });
    return res.end(fs.readFileSync(logSrc));
  }
  const p = path.join(root, f);
  if (!p.startsWith(root) || !fs.existsSync(p)) { res.writeHead(404); return res.end('not found'); }
  res.writeHead(200, { 'Content-Type': mime[path.extname(p)] || 'application/octet-stream' });
  res.end(fs.readFileSync(p));
});

server.listen(port, () => {
  const url = `http://localhost:${port}/index.html`;
  console.log(`Security Harness for GitHub Copilot dashboard → ${url}`);
  const cmd = process.platform === 'win32' ? `start "" "${url}"` : process.platform === 'darwin' ? `open ${url}` : `xdg-open ${url}`;
  exec(cmd, () => {});
});
