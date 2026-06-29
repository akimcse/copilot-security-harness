#!/usr/bin/env pwsh
# Security Harness for GitHub Copilot - global installer
# Registers the guardrail as a user-level preToolUse hook so EVERY copilot session,
# in any folder, is checked. Also copies skills so /secret-scan etc. work everywhere.

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $MyInvocation.MyCommand.Path
$base = $env:USERPROFILE
$dst  = Join-Path $base '.copilot\harness'
$skillsSrc = Join-Path $repo '.agents\skills'
$skillsDst = Join-Path $base '.copilot\skills'
$cfg  = Join-Path $base '.copilot\settings.json'

Write-Host '== Security Harness - global install ==' -ForegroundColor Cyan

# 1) Copy engine + ruleset + hook into ~/.copilot/harness
New-Item -ItemType Directory -Force -Path $dst | Out-Null
Copy-Item (Join-Path $repo '.agents\scripts\engine.js')       $dst -Force
Copy-Item (Join-Path $repo '.agents\scripts\ruleset.json')    $dst -Force
Copy-Item (Join-Path $repo '.agents\scripts\pre-tool-use.js') $dst -Force
Write-Host "engine + ruleset + hook -> $dst"

# 2) Copy skills so slash skills work in any folder
New-Item -ItemType Directory -Force -Path $skillsDst | Out-Null
Get-ChildItem $skillsSrc -Directory | ForEach-Object {
  Copy-Item $_.FullName (Join-Path $skillsDst $_.Name) -Recurse -Force
}
Write-Host "skills -> $skillsDst"

# 3) Register the user-level preToolUse hook in ~/.copilot/config.json
$hookCmd = "node `"$dst\pre-tool-use.js`""
if (Test-Path $cfg) { $rawCfg = (Get-Content $cfg -Raw) -replace '(?m)^\s*//.*$',''; $json = $rawCfg | ConvertFrom-Json } else { $json = [pscustomobject]@{} }
if (-not $json.PSObject.Properties['hooks']) { $json | Add-Member hooks ([pscustomobject]@{}) -Force }
$json.hooks | Add-Member preToolUse @(
  [pscustomobject]@{ matcher = 'shell'; type = 'command'; command = $hookCmd }
) -Force
($json | ConvertTo-Json -Depth 12) | Set-Content $cfg -Encoding UTF8
Write-Host "hook registered in $cfg"

Write-Host ""
Write-Host "Done. Every 'copilot' session now runs the guardrail before shell tools." -ForegroundColor Green
Write-Host "Uninstall: remove hooks.preToolUse from $cfg and delete $dst"
