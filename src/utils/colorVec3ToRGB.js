'use strict';

module.exports = (vec3, precision = 3) => {
  const multiplier = 10 ** precision;
  const rgbValues = Object.values(vec3).map((value) => Math.round(value * 255 * multiplier) / multiplier);
  return `rgb(${rgbValues.join(',')})`;
};
