import React from "react";
import AuthService from "../service/auth.service";

const Profile = () => {
  AuthService.login("kullanici", "sifre");
  const user = AuthService.getCurrentUser();

  console.log(user);
  console.log(user.roles);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{user.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {user.token.substring(0, 20)} ...{" "}
        {user.token.substr(user.token.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {user.id}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {user.roles &&
          user.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
