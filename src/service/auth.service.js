import { SecureSessionStorage } from "../util/SecureSessionStorage";
import HttpStatus from "../util/HttpStatus";
import { authInfoStore } from "../util/CoreStore";
import User from "../model/User";
import Constants from "../util/Constants";

// const user = {
//   id: 1,
//   username: "myuser",
//   token:
//     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MDE2Nzg1MjIsImV4cCI6MTczMzIxNDUyMiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbImFkbWluIiwiUHJvamVjdCBBZG1pbmlzdHJhdG9yIl19.6Jm3-WdXzjJOnwualJUGtqw9q35k_D_xyDSxk67FF68",
//   email: "user@backend.com",
//   roles: ["admin", "sorgu"],
// };

const login = (username, password) => {
  try {
    fetch(Constants.BASE_URL + "/auth/login", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === HttpStatus.UNAUTHORIZED) {
        window.alert(response.body);
      }
      throw new Error('Something went wrong');
    })
    .then((data) => {
      console.log(data);
      const user = new User({
        "username": data.result.userName,
        "active": data.result.active,
        "roles": data.result.roles,
        "accessToken": data.result.jwtResponse.accessToken
      });

      setCurrentUser(user);
      SecureSessionStorage.setItem("user", user);
    })
    .catch((error) => {
      console.log(error)
    });
   
  } catch (error) {
    console.error("There was an error!", error);
  }
};

const logout = () => {
  SecureSessionStorage.removeItem("user");

  authInfoStore.authenticated = false;
  authInfoStore.jwtToken = "";
  authInfoStore.roles = [];
  authInfoStore.username = "no-user";
  authInfoStore.sessionStartTime = Date.now();
};

// const getCurrentUser = () => {
//   return SecureSessionStorage.getItem("user");
// };

const setCurrentUser = (user) => {
  authInfoStore.authenticated = true;
  authInfoStore.jwtToken = user.accessToken;
  authInfoStore.roles = user.roles;
  authInfoStore.username = user.userName;
  authInfoStore.sessionStartTime = Date.now();
}

const AuthService = {
  login,
  logout,
  setCurrentUser
};

export default AuthService;
