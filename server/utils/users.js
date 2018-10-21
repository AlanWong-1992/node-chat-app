
class Users {
  constructor() {
    this.users = []
  }

  addUser(id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var user = this.users.filter((user) => user.id === id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }

  getUser(id) {
    var user = this.users.filter((user) => user.id === id);
    return user;
  }

  getUserList(room) {
    var usersRoomArray = this.users.filter((user) => user.room === room);
    var namesArray = usersRoomArray.map((user) => user.name);
    return namesArray;
  }
}

module.exports = {Users};

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)
