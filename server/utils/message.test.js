var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('Should generate the correct message object', () => {
    var from = 'Alan';
    var text = 'Hello this is Alan';
    var res = generateMessage(from, text);

    expect(typeof res.from).toBe('string');
    expect(res.from).toBe(from);
    expect(typeof res.text).toBe('string');
    expect(res.text).toBe(text);
    expect(typeof res.createAt).toBe('number');

  });
});

describe('generateLocationMessage', () => {
  it('Should generate correct location object', () => {
    var from = "John";
    var latitude = 15;
    var longitude = 19;
    var url = 'https://www.google.com/maps?q=15,19';
    var message = generateLocationMessage(from, latitude, longitude);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toIncludeKeys({from, url});
  });
});
