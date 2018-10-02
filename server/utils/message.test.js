var expect = require('expect');

var {generateMessage} = require('./message');

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
