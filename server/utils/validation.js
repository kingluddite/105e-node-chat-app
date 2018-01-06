const isRealString = str => {
  return typeof str === 'string' && str.trim().length > 0;
};

const getPathFromUrl = url => {
  return url.split('?')[1];
};

module.exports = { isRealString, getPathFromUrl };
