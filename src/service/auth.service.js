import secureLocalStorage from "react-secure-storage";

const user = {
  id: 1,
  username: "myuser",
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MDE2Nzg1MjIsImV4cCI6MTczMzIxNDUyMiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbImFkbWluIiwiUHJvamVjdCBBZG1pbmlzdHJhdG9yIl19.6Jm3-WdXzjJOnwualJUGtqw9q35k_D_xyDSxk67FF68",
  email: "user@backend.com",
  roles: ["admin", "sorgu"],
};

const login = (username, password) => {
  //   return axios
  //     .post(API_URL + "signin", {
  //       username,
  //       password,
  //     })
  //     .then((response) => {
  //       if (response.data.accessToken) {
  //         localStorage.setItem("user", JSON.stringify(response.data));
  //       }

  //       return response.data;
  //     });

  secureLocalStorage.setItem("user", user);

  return user;
};

const logout = () => {
  secureLocalStorage.removeItem("user");
};

const getCurrentUser = () => {
  return secureLocalStorage.getItem("user");
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
