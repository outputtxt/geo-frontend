import React from "react";
import { authInfoStore } from "../util/CoreStore";
import { useSnapshot } from "valtio";

const Profile = () => {
  const authInfo = useSnapshot(authInfoStore);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{authInfo.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {authInfo.jwtToken.substring(0, 20)} ...{" "}
        {authInfo.jwtToken.substr(authInfo.jwtToken.length - 20)}
      </p>
      <strong>Authorities:</strong>
      <ul>{authInfo.role && <li key={authInfo.role}>{authInfo.role}</li>}</ul>
    </div>
  );
};

export default Profile;
