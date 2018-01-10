class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    // return user that was removed
    // return this.users.filter(user => user.id === id)[0];
    const user = this.getUser(id);

    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }

    return user;
  }

  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  getUserList(room) {
    // we will just return an array of strings
    // ['Manny', 'Mo', 'Jack']
    const users = this.users.filter(user => user.room === room);
    const namesArray = users.map(user => user.name);

    return namesArray;
  }
}

module.exports = { Users };
