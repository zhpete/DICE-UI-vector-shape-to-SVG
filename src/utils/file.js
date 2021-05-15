'use strict';

const {
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  writeFileSync,
} = require('fs');
const { join: joinPath } = require('path');

const isDirectory = (path) => statSync(path).isDirectory();
const getDirectories = (path) => readdirSync(path)
  .map((name) => joinPath(path, name))
  .filter(isDirectory);

const isFile = (path) => statSync(path).isFile();
const getFiles = (path) => readdirSync(path)
  .map((name) => joinPath(path, name))
  .filter(isFile);

const getFilesRecursively = (path) => {
  const dirs = getDirectories(path);
  const files = dirs
    .map((dir) => getFilesRecursively(dir))
    .reduce((a, b) => a.concat(b), []);
  return files.concat(getFiles(path));
};

exports.getFilesRecursively = getFilesRecursively;

exports.splitDirAndFilename = (filepath) => {
  const pathSegments = filepath.split('\\');
  const filename = pathSegments.pop();
  const dir = pathSegments.join('\\');
  return { dir, filename };
};

exports.writeOutputFile = (filename, data, dir = '') => {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const outPath = joinPath(dir, filename);
  writeFileSync(outPath, data);
  console.log(`Parsed ${outPath}`);
};
