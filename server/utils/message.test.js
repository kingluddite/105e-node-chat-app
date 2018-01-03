const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Admin';
    const lat = 123;
    const lng = 456;
    const url = 'https://www.google.com/maps?q=123,456';
    const locationMessage = generateLocationMessage(from, lat, lng);

    expect(typeof locationMessage.createdAt).toEqual('number');
    expect(locationMessage).toMatchObject({
      from,
      url,
    });
  });
});
