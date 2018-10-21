const expect = require('expect');
var {isRealString} = require('./validation.js');

describe('isRealString', () => {
  it('Should validate a real string', () => {
    var login1 = {
      name: "Alan",
      room: "Node Course"
    }

    var login2 = {
      name: "",
      room: "        "
    }

    var resNameOfLogin1 = isRealString(login1.name);
    var resRoomOfLogin1 = isRealString(login1.room);
    var resNameOfLogin2 = isRealString(login2.name);
    var resRoomOfLogin2 = isRealString(login2.room);

    expect(resNameOfLogin1).toBe(true);
    expect(resRoomOfLogin1).toBe(true);
    expect(resNameOfLogin2).toBe(false);
    expect(resRoomOfLogin2).toBe(false);
  });
});
