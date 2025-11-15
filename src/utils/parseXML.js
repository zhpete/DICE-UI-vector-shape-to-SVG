const { parseString: parseXMLString } = require('xml2js');

/*
  By default, xml2js always puts child nodes in an array which can be a pain to work with.
  It makes the code hard to understand when you have a lot of `[0]`s for things that aren't arrays.
  The `explicitArray: false` option makes sure arrays are only used if there is more than 1 child.
  Generally this helps but means that if there is 1 or 0 children it will not use an array.
  We can tell where an array is supposed to be used because of the `Count` attribute.
  The following script fixes arrays of 0 or 1 children.
*/
const formatConsistentArrays = (xmlObj) => {
  const convertToArrayIfHasCount = (obj) => {
    if (typeof obj === 'object' && obj !== null) {
      if ('$' in obj && 'Count' in obj.$) {
        const key = Object.keys(obj).find((k) => !['$', '_'].includes(k)) || 'member';
        const value = obj[key];
        if (value === null || typeof value === 'undefined') obj[key] = [];
        else if (!Array.isArray(value)) obj[key] = [value];
      }
      formatConsistentArrays(obj);
    }
  };
  Object.values(xmlObj).forEach(convertToArrayIfHasCount);
};

module.exports = (data) => new Promise((resolve, reject) => {
  parseXMLString(
    data,
    { explicitArray: false },
    (err, result) => {
      if (err) reject(err);
      else {
        formatConsistentArrays(result);
        resolve(result);
      }
    },
  );
});
