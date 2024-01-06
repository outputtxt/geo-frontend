import { SecureSessionStorage } from "../util/SecureSessionStorage";
import HttpStatus from "../util/HttpStatus";
import { authInfoStore } from "../util/CoreStore";
import User from "../model/User";
import Constants from "../util/Constants";
import { showError, showInfo } from "../components/CustomDialog";

//=============================  LOGIN  =============================
const login = (username, password) => {
  //*********************  TEST  **********************/
  // const user = new User({
  //   username: "myuser",
  //   active: true,
  //   role: "ROLE_" + username.toUpperCase(),
  //   accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3M",
  // });
  // setCurrentUser(user);
  // SecureSessionStorage.setItem("user", user);

  //*********************  PROD  **********************/
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
        showError("Hatalı kullanıcı adı veya şifre !");
      }
      return null;
    })
    .then((data) => {
      if(data == null) {
        return;
      }

    const user = new User({
      "username": data.result.userName,
      "active": data.result.active,
      "role": data.result.roles[0],
      "accessToken": data.result.jwtResponse.accessToken
    });

      setCurrentUser(user);
      SecureSessionStorage.setItem("user", user);
    })
    .catch((error) => {
      console.log(error);
      window.alert("Uygulamaya bağlanılamadı, lütfen teknik ekiple iletişime geçiniz.");
    });

  } catch (error) {
    console.error("There was an error!", error);
    window.alert("Uygulamaya bağlanılamadı, lütfen teknik ekiple iletişime geçiniz.");
  }
};

//=============================  LOGOUT  =============================
const logout = () => {
  SecureSessionStorage.removeItem("user");

  authInfoStore.authenticated = false;
  authInfoStore.jwtToken = "";
  authInfoStore.role = "";
  authInfoStore.username = "no-user";
  authInfoStore.sessionStartTime = Date.now();
};

// const getCurrentUser = () => {
//   return SecureSessionStorage.getItem("user");
// };

const setCurrentUser = (user) => {
  authInfoStore.authenticated = true;
  authInfoStore.jwtToken = user.accessToken;
  authInfoStore.role = user.role;
  authInfoStore.username = user.username;
  authInfoStore.sessionStartTime = Date.now();
};


//=============================  CHANGE PASSWORD  =============================
const changePassword = (username, password, token, setOpenDialog) => {
  var responseStatus = 200;

  try {
    fetch(Constants.BASE_URL + "/auth/changePassword", {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token,
      },
      method: "POST",
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    }).then((response) => {
      responseStatus = response.status;
      return response.text();
    })
    .then((data) => {
      if (responseStatus === HttpStatus.OK) {
        showInfo("Şifreniz değiştirilmiştir.");
        setOpenDialog(false);
        return true;
      } else {
        console.log(data);
        showError(data);
        return false;
      }      
    })
    .catch((error) => {
      console.log(error);
      window.alert("Uygulamaya bağlanılamadı, lütfen teknik ekiple iletişime geçiniz.");
      return false;
    });

  } catch (error) {
    console.error("There was an error!", error);
    window.alert("Uygulamaya bağlanılamadı, lütfen teknik ekiple iletişime geçiniz.");
    return false;
  }
};

const AuthService = {
  login,
  logout,
  setCurrentUser,
  changePassword,
};

export default AuthService;
