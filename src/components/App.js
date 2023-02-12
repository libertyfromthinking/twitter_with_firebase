import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService as auth } from 'fbase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  // console.log(auth.currentUser)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      }else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  },[])

  return (
    <>
      { init ? <AppRouter userObj={userObj} isLoggedIn={isLoggedIn} /> : 'initializing...'}
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
