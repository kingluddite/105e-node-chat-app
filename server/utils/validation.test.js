const expect = require('expect');

// import isRealString
const { isRealString, getPathFromUrl } = require('./validation');

// isRealString
// should reject non-string values
// should reject string with only spaces
// should allow string with non-space characters

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const res = isRealString(98);
    expect(res).toBe(false);
  });

  it('should reject string with only spaces', () => {
    const res = isRealString('     ');
    expect(res).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    const res = isRealString('   John   ');
    expect(res).toBe(true);
  });
});

describe('getPathFromUrl', () => {
  it('should strip out $', () => {
    const res = getPathFromUrl('?name=john');
    expect(res).toBe('name=john');
  });
});
