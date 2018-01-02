const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Tom';
    const text = 'Some message';
    const message = generateMessage(from, text);

    expect(typeof message.createdAt).toEqual('number');
    expect(message).toMatchObject({
      from,
      text,
    });
  });
});
