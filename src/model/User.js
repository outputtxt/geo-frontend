export default class User {
  constructor(item) {
    this.username = item.username;
    this.active = item.active;
    this.role = item.role;
    this.accessToken = item.accessToken;
  }
}
