import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ refreshUser: ()=>{}, userObj, isLoggedIn }) => {
  return (
    <>
      {isLoggedIn && <Navigation userObj={userObj} />}
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