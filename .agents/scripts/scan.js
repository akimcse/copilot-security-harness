#!/usr/bin/env node
'use strict';
const fs = require('fs'); const path = require('path');
const { loadRuleset, evaluate } = require('./engine');
const target = process.argv[2] || '-'; const rs = loadRuleset(); let total = 0;
function scan(label, t) { const { decision, hits } = evaluate(t, rs); if (hits.length) { total += hits.length; console.log(`\n[${decision.toUpperCase()}] ${label}`); hits.forEach((h) => console.log(`  - ${h.severity} ${h.category}: ${h.message}`)); } }
function walk(p) { const st = fs.statSync(p); if (st.isDirectory()) fs.readdirSync(p).filter((f) => !['node_modules', '.git'].includes(f)).forEach((f) => walk(path.join(p, f))); else scan(p, fs.readFileSync(p, 'utf8')); }
if (target === '-') scan('stdin', fs.readFileSync(0, 'utf8')); else walk(target);
console.log(`\nFindings: ${total}`); process.exit(total ? 1 : 0);
