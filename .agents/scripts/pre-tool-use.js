#!/usr/bin/env node
'use strict';
const fs = require('fs');
const { loadRuleset, evaluate } = require('./engine');
let raw = ''; try { raw = fs.readFileSync(0, 'utf8'); } catch {}
let e = {}; try { e = JSON.parse(raw); } catch { e = { command: raw }; }
const cmd = [e.command, e.input].filter(Boolean).join(' ');
const { decision, hits } = evaluate(cmd, loadRuleset());
const path = require('path');
const logDir = path.join(__dirname, '..', '..', 'logs');
fs.mkdirSync(logDir, { recursive: true });
fs.appendFileSync(path.join(logDir, 'guardrail.log'), JSON.stringify({ ts: new Date().toISOString(), tool: e.tool || 'guardrail-review', input: cmd.slice(0, 200), decision, hits }) + '\n');
if (decision === 'block') { process.stderr.write('[GUARDRAIL BLOCK] ' + hits.map((h) => h.category).join(',') + '\n'); process.exit(2); }
process.exit(0);
