#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');

const FOLDER_RENAMES = [
  ['noteSuspAssts', 'noteSuspAssts'],
  ['noteSuspCpnnts', 'noteSuspCpnnts'],
  ['noteSuspCtx', 'noteSuspCtx'],
  ['noteSuspData', 'noteSuspData'],
  ['noteSuspNav', 'noteSuspNav'],
  ['noteSuspScrn', 'noteSuspScrn'],
  ['noteSuspStrg', 'noteSuspStrg'],
  ['noteSuspThm', 'noteSuspThm'],
  ['noteSuspUtil', 'noteSuspUtil'],
];

const OLD_DUPLICATE_DIRS = [
  'assets',
  'components',
  'context',
  'data',
  'navigation',
  'screens',
  'storage',
  'theme',
  'utils',
];

function walkFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, acc);
    else if (/\.(tsx?|mjs|js|json)$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

function replaceContent(content) {
  return content
    .replaceAll('NoteSusp', 'NoteSusp')
    .replaceAll('noteSusp', 'noteSusp')
    .replaceAll("'notesusp:saved-ciphers'", "'notesusp:saved-ciphers'")
    .replaceAll("'notesusp:party-sessions'", "'notesusp:party-sessions'")
    .replaceAll('noteSuspLegacyArchivedCiphersKey', 'noteSuspLegacyArchivedCiphersKey')
    .replaceAll('noteSuspLegacyArchivedSessionsKey', 'noteSuspLegacyArchivedSessionsKey');
}

function renameFilesInDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      renameFilesInDir(full);
      continue;
    }
    if (entry.name.includes('NoteSusp')) {
      const next = entry.name.replaceAll('NoteSusp', 'NoteSusp');
      fs.renameSync(full, path.join(dir, next));
    }
  }
}

for (const [oldName, newName] of FOLDER_RENAMES) {
  const oldPath = path.join(SRC, oldName);
  const newPath = path.join(SRC, newName);
  if (fs.existsSync(oldPath)) {
    renameFilesInDir(oldPath);
    if (fs.existsSync(newPath)) fs.rmSync(newPath, {recursive: true, force: true});
    fs.renameSync(oldPath, newPath);
  }
}

for (const dir of OLD_DUPLICATE_DIRS) {
  fs.rmSync(path.join(SRC, dir), {recursive: true, force: true});
}

const files = [
  ...walkFiles(SRC),
  path.join(ROOT, 'App.tsx'),
  path.join(ROOT, 'react-native.config.js'),
  path.join(ROOT, 'scripts', 'noteSuspRename.mjs'),
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  const next = replaceContent(content);
  if (next !== content) fs.writeFileSync(file, next);
}

if (fs.existsSync(path.join(ROOT, 'scripts', 'noteSuspRefactor.mjs'))) {
  fs.rmSync(path.join(ROOT, 'scripts', 'noteSuspRefactor.mjs'), {force: true});
}

console.log('noteSusp rename complete.');
