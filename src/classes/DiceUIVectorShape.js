const DiceUIVectorInnerPaths = require('./DiceUIVectorInnerPaths');
const DiceUIVectorPath = require('./DiceUIVectorPath');
const DiceUIVectorShapeCapType = require('../enums/DiceUIVectorShapeCapType');
const DiceUIVectorShapeDrawStyle = require('../enums/DiceUIVectorShapeDrawStyle');
const colorVec3ToRGB = require('../utils/colorVec3ToRGB');
const SVG_DEFAULTS = require('../utils/SVGDefaults');

module.exports = class DiceUIVectorShape {
  constructor (data) {
    this.shape = data;
  }

  get alpha () {
    return Number.parseFloat(this.shape.Alpha);
  }

  get color () {
    return colorVec3ToRGB(this.shape.Color.Vec3);
  }

  get drawStyle () {
    return DiceUIVectorShapeDrawStyle[this.shape.DrawStyle];
  }

  get hasMask () {
    return this.innerPaths.paths.length > 0;
  }

  get isClosed () {
    return this.drawStyle !== 'lines';
  }

  get linecap () {
    return DiceUIVectorShapeCapType[this.shape.StartCapType];
  }

  get lineWidth () {
    return Number.parseFloat(this.shape.LineWidth);
  }

  get innerPaths () {
    return new DiceUIVectorInnerPaths(this.shape.InnerPaths);
  }

  get path () {
    return new DiceUIVectorPath(this.shape.Path.DiceUIVectorPath);
  }

  getXML2JSMaskObject (index) {
    return this.hasMask
      ? {
        $: { id: `Shape${index}InnerPaths` },
        rect: {
          $: {
            x: 0,
            y: 0,
            width: '100%',
            height: '100%',
            fill: '#fff',
          },
        },
        path: this.innerPaths.getXML2JSMaskPathObject(this.isClosed),
      }
      : null;
  }

  getXML2JSPathObject (index) {
    const attrs = {
      d: this.path.toSVGPathString(this.isClosed),
      fill: this.drawStyle === 'filled' ? this.color : 'none',
      mask: this.hasMask ? `url(#Shape${index}InnerPaths)` : SVG_DEFAULTS.mask,
      opacity: this.alpha,
      stroke: this.lineWidth === 0 ? SVG_DEFAULTS.stroke : this.color,
      'stroke-linecap': this.linecap,
      'stroke-linejoin': this.path.corners[0].linejoin,
      'stroke-width': this.lineWidth === 0 ? SVG_DEFAULTS['stroke-width'] : this.lineWidth,
    };
    Object.entries(attrs).forEach(([key, value]) => {
      if (value === SVG_DEFAULTS[key]) delete attrs[key];
    });
    return { $: attrs };
  }
};
