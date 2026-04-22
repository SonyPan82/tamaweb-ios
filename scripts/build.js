#!/usr/bin/env node
// Copies web assets to www/ for Capacitor packaging
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DEST = path.join(ROOT, 'www');

const EXCLUDES = new Set([
    'ios', 'node_modules', 'www', '.git',
    'package.json', 'package-lock.json',
    'capacitor.config.json', 'scripts',
    'blog', 'creator', 'growth-chart',
    'README.md', 'TERMS_OF_USE.md', 'LICENSE',
    '.gitignore',
]);

function copyRecursive(src, dest) {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        for (const entry of fs.readdirSync(src)) {
            copyRecursive(path.join(src, entry), path.join(dest, entry));
        }
    } else {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(src, dest);
    }
}

fs.rmSync(DEST, { recursive: true, force: true });
fs.mkdirSync(DEST, { recursive: true });

for (const entry of fs.readdirSync(ROOT)) {
    if (!EXCLUDES.has(entry)) {
        copyRecursive(path.join(ROOT, entry), path.join(DEST, entry));
    }
}

console.log('Web assets copied to www/');
