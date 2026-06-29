'use strict';
const fs = require('fs');
const path = require('path');
function loadRuleset(p) { return JSON.parse(fs.readFileSync(p || path.join(__dirname, 'ruleset.json'), 'utf8')); }
function evaluate(payload, ruleset) {
  const text = String(payload || '');
  if (ruleset.allowlist && ruleset.allowlist.some((a) => text.includes(a))) return { decision: 'allow', hits: [] };
  const hits = [];
  for (const rule of ruleset.rules) for (const pat of rule.match) {
    let re; try { re = new RegExp(pat); } catch { continue; }
    if (re.test(text)) { hits.push({ id: rule.id, category: rule.category, severity: rule.severity, message: rule.message }); break; }
  }
  let decision = 'allow';
  if (hits.some((h) => h.severity === 'high')) decision = ruleset.policy === 'block' ? 'block' : 'warn';
  else if (hits.length) decision = 'warn';
  return { decision, hits };
}
module.exports = { loadRuleset, evaluate };
