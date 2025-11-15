const DiceUIVectorPathCornerType = require('../enums/DiceUIVectorPathCornerType');

module.exports = class DiceUIVectorPathCorner {
  constructor (data) {
    this.corner = data;
  }

  get linejoin () {
    return DiceUIVectorPathCornerType[this.corner.CornerType];
  }

  get position () {
    return this.corner.Position.Vec2;
  }

  get radius () {
    return Number.parseFloat(this.corner.Radius);
  }

  getSVGPathCommand () {
    const { x, y } = this.position;
    const { radius } = this;
    if (radius === 0) return `L${x},${y}`;
    const sweepFlag = radius < 0 ? 1 : 0;
    return `A${radius},${radius},0,0,${sweepFlag},${x},${y}`;
  }
};
