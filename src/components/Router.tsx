import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import { CustomUser, Fn } from "type";

const AppRouter = ({
  refreshUser,
  userObj,
  isLoggedIn,
}: {
  refreshUser: Fn;
  userObj: CustomUser;
  isLoggedIn: Boolean;
}): JSX.Element => {
  return (
    <>
      {isLoggedIn && <Navigation userObj={userObj as CustomUser} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route
              path="/profile"
              element={<Profile refreshUser={refreshUser} userObj={userObj} />}
            />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
