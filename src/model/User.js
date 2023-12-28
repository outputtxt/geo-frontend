export default class User {
  constructor(item) {
    this.username = item.username;
    this.password = item.password;
    this.active = item.active;
    this.role = item.role;
  }
}
