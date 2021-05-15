'use strict';

const args = require('./args');
const {
  join: joinPath,
  relative: getRelativePath,
} = require('path');
const { readFileSync } = require('fs');
const { Builder: XMLBuilder } = require('xml2js');
const {
  getFilesRecursively,
  splitDirAndFilename,
  writeOutputFile,
} = require('./utils/file');
const parseXML = require('./utils/parseXML');
const DiceUIVectorShapeAsset = require('./classes/DiceUIVectorShapeAsset');

const files = getFilesRecursively(args.input);
files.forEach(async (filepath) => {
  const data = readFileSync(filepath, { encoding: 'utf-8' });
  try {
    const xml = await parseXML(data);
    const asset = new DiceUIVectorShapeAsset(xml.DiceUIVectorShapeAsset);
    const { filename, dir } = splitDirAndFilename(filepath);
    writeOutputFile(
      filename.replace(/\.xml$/u, '.svg'),
      new XMLBuilder({ headless: true }).buildObject(asset.toXML2JSSVGObject()),
      joinPath(args.output, getRelativePath(args.input, dir)),
    );
  } catch (er) {
    console.error(`Failed to parse ${filepath}`);
  }
});
