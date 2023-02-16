import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService as auth } from 'fbase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    })
  },[])

  return (
    <>
      { init ? <AppRouter userObj={userObj} isLoggedIn={Boolean(userObj)} /> : 'initializing...'}
    </>
  );
}

export default App;
