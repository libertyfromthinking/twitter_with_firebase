import { authService as auth } from "fbase";
import React, { useEffect } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { CustomUser } from "components/App";

const Navigation = ({ userObj }: { userObj: CustomUser }): JSX.Element => {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    auth.signOut();
    navigate(`/`);
  };

  return (
    <nav>
      <ul>
        <li>
          <img src={userObj.photoURL} width="50px" height="50px" />
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{userObj.displayName}의 Profile</Link>
        </li>
        <li>
          <button onClick={onLogoutClick}>Sign Out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
