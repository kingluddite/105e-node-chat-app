const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Tom';
    const text = 'Some message';
    const message = generateMessage(from, text);

    expect(typeof message.createdAt.toBe('number'));
    // call generateMessage(from, text)
    // get response back and store in variable
    // make assertions about response
    // assert from matches value you passed in
    // assert text matches up
    // assert that createdAt is numberj
  });
});
