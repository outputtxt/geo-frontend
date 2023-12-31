export default class User {
  constructor(item) {
    this.username = item.username;
    this.active = item.active;
    this.roles = item.roles;
    this.accessToken = item.accessToken;
  }
}
