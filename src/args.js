const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

module.exports = yargs(hideBin(process.argv))
  .options({
    input: {
      alias: 'i',
      demandOption: true,
      description: 'The directory where the DiceUIVectorShapeAsset XML files are located',
      normalize: true,
      type: 'string',
    },
    output: {
      alias: 'o',
      demandOption: true,
      description: 'The directory where the parsed SVG files will be placed',
      normalize: true,
      type: 'string',
    },
  })
  .argv;
