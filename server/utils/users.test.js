const expect = require('expect');

var {Users} = require('./users');


describe('Users', () => {
  // var users;
  beforeEach(() => {
    var user1 = {id: 123, name: 'John', room: 'Maths'};
    var user2 = {id: 124, name: 'Jack', room: 'Maths'};
    var user3 = {id: 125, name: 'Beth', room: 'Biology'};
    var user4 = {id: 126, name: 'James', room: 'Chemistry'};
    var user5 = {id: 127, name: 'Jill', room: 'Physics'};

    users = new Users();
    users.addUser(user1.id, user1.name, user1.room);
    users.addUser(user2.id, user2.name, user2.room);
    users.addUser(user3.id, user3.name, user3.room);
    users.addUser(user4.id, user4.name, user4.room);
    users.addUser(user5.id, user5.name, user5.room);
  });

  it('Should create a a list of users and insert user into users', () => {
    users.addUser(1234, 'alan', 'Node');
    expect(users.users.length).toBe(6);
    expect(users.users[5]).toEqual({id:1234, name:'alan', room:'Node'});
  });

  it('Should get all users from a particular room', () => {
    var usersInRoom1 = users.getUserList('Maths');
    var usersInRoom2 = users.getUserList('Physics');
    expect(usersInRoom1.length).toBe(2);
    expect(usersInRoom2.length).toBe(1);
    expect(usersInRoom1[0]).toEqual('John');
    expect(usersInRoom1[1]).toEqual('Jack');
  });

  it('Should return 0 users if there are nobody in the room', () => {
    var usersInRoom = users.getUserList('English');
    expect(usersInRoom.length).toBe(0);
  });

  it('Should find a particular user with a unique ID', () => {
    var user = users.getUser(123);
    expect(user[0].name).toBe('John');
  });

  it('Should not find a particular user with a non-existent ID', () => {
    var user = users.getUser(9876);
    expect(user.length).toBe(0);
  });

  it('Should remove a user from the users array', () => {
    var user = users.removeUser(123);
    expect(users.users.length).toBe(4);
    expect(user[0].id).toBe(123);
  });

  it('Should not remove a user if an non-existent ID is provided', () => {
    var user = users.removeUser(987);
    expect(users.users.length).toBe(5);
    expect(typeof user[0]).toBe('undefined');
  });
});
