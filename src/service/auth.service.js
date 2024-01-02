import { SecureSessionStorage } from "../util/SecureSessionStorage";
import HttpStatus from "../util/HttpStatus";
import { authInfoStore } from "../util/CoreStore";
import User from "../model/User";
import Constants from "../util/Constants";

const login = (username, password) => {
  //*********************  TEST  **********************/
  const user = new User({
    username: "myuser",
    active: true,
    roles: ["ROLE_ADMIN"],
    accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3M",
  });
  setCurrentUser(user);
  SecureSessionStorage.setItem("user", user);

  //*********************  PROD  **********************/
  // try {
  //   fetch(Constants.BASE_URL + "/auth/login", {
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     method: "POST",
  //     body: JSON.stringify({
  //       "username": username,
  //       "password": password
  //     })
  //   }).then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     } else if (response.status === HttpStatus.UNAUTHORIZED) {
  //       window.alert("Hatalı kullanıcı adı veya şifre !");
  //     }
  //     return null;
  //   })
  //   .then((data) => {
  //     if(data == null) {
  //       return;
  //     }

  //     const user = new User({
  //       "username": data.result.userName,
  //       "active": data.result.active,
  //       "roles": data.result.roles,
  //       "accessToken": data.result.jwtResponse.accessToken
  //     });

  //     setCurrentUser(user);
  //     SecureSessionStorage.setItem("user", user);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     window.alert("Uygulamaya bağlanılamadı, lütfen teknik ekiple iletişime geçiniz.");
  //   });

  // } catch (error) {
  //   console.error("There was an error!", error);
  //   window.alert("Uygulamaya bağlanılamadı, lütfen teknik ekiple iletişime geçiniz.");
  // }
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
};

const AuthService = {
  login,
  logout,
  setCurrentUser,
};

export default AuthService;
