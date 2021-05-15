'use strict';

const DiceUIVectorShape = require('./DiceUIVectorShape');

module.exports = class DiceUIVectorShapeAsset {
  constructor (data) {
    this.asset = data;
  }

  get layoutRect () {
    const layoutRect = this.asset.LayoutRect.Vec4;
    const propertyMap = {
      x: 'minX',
      y: 'minY',
      z: 'width',
      w: 'height',
    };
    return Object.entries(propertyMap).reduce((obj, [key, value]) => {
      obj[value] = Number.parseFloat(layoutRect[key]);
      return obj;
    }, {});
  }

  get shapes () {
    return this.asset.Shapes.member.map((member) => new DiceUIVectorShape(member.DiceUIVectorShape));
  }

  get viewBox () {
    return Object.values(this.layoutRect).join(' ');
  }

  toXML2JSSVGObject () {
    return {
      svg: {
        $: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: this.viewBox,
        },
        mask: this.shapes
          .map((shape, index) => shape.getXML2JSMaskObject(index))
          .filter((mask) => Boolean(mask)),
        path: this.shapes.map((shape, index) => shape.getXML2JSPathObject(index)),
      },
    };
  }
};
