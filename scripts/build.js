#!/usr/bin/env node
// Copies web assets to www/ for Capacitor packaging
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DEST = path.join(ROOT, 'www');
const CAPACITOR_CORE_SRC = path.join(ROOT, 'node_modules', '@capacitor', 'core', 'dist', 'capacitor.js');
const CAPACITOR_LOCAL_NOTIFICATIONS_SRC = path.join(
    ROOT,
    'node_modules',
    '@capacitor',
    'local-notifications',
    'dist',
    'plugin.js'
);

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

copyRecursive(CAPACITOR_CORE_SRC, path.join(DEST, 'vendor', 'capacitor.js'));
copyRecursive(
    CAPACITOR_LOCAL_NOTIFICATIONS_SRC,
    path.join(DEST, 'vendor', 'capacitor-local-notifications.js')
);

console.log('Web assets copied to www/');
