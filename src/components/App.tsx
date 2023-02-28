import React, { useEffect, useState } from "react";
import { authService as auth, authService } from "fbase";
import { onAuthStateChanged, updateProfile, User } from "firebase/auth";
import AppRouter from "components/Router";

function App(): JSX.Element {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user: NullableUser) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
          updateProfile: (args: CustomUser) => {
            updateProfile(user, args);
          },
        });
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user: NullableUser = authService.currentUser;
    if (user !== null) {
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
        updateProfile: (args: CustomUser) => {
          updateProfile(user, args);
        },
      });
    }
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

type NullableUser = User | null;
interface CustomUser {
  displayName?: string | null | undefined;
  photoURL?: string | null | undefined;
}

export default App;