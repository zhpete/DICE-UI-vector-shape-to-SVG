'use strict';

const DiceUIVectorPathCorner = require('./DiceUIVectorPathCorner');

module.exports = class DiceUIVectorPath {
  constructor (data) {
    this.path = data;
  }

  get corners () {
    return this.path.Corners.member
      .map((corner) => new DiceUIVectorPathCorner(corner.DiceUIVectorPathCorner));
  }

  toSVGPathString (isClosed) {
    const lastCorner = this.corners[this.corners.length - 1];
    const { x, y } = lastCorner.position;
    const moveToStartString = `M${x},${y}`;
    const path = this.corners.reduce(
      (str, corner) => str.concat(corner.getSVGPathCommand()),
      moveToStartString,
    );
    if (isClosed) return path.concat('Z');
    return path;
  }
};
