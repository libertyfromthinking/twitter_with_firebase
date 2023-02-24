import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService as auth, authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
          updateProfile: (args) => {
            user.updateProfile(args);
          },
        });
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      updateProfile: (args) => {
        user.updateProfile(args);
      },
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          userObj={userObj}
          isLoggedIn={Boolean(userObj)}
        />
      ) : (
        "initializing..."
      )}
    </>
  );
}

export default App;
