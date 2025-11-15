const DiceUIVectorPath = require('./DiceUIVectorPath');

module.exports = class DiceUIVectorInnerPaths {
  constructor (data) {
    this.innerPaths = data;
  }

  get paths () {
    return this.innerPaths.member.map((path) => new DiceUIVectorPath(path.DiceUIVectorPath));
  }

  getXML2JSMaskPathObject (isClosed) {
    return this.paths.map((path) => ({
      $: {
        d: path.toSVGPathString(isClosed),
        fill: '#000',
      },
    }));
  }
};
