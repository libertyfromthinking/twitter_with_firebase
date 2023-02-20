import { authService as auth } from "fbase";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    auth.signOut();
    navigate(`/`);
  };
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <button onClick={onLogoutClick}>Sign Out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
