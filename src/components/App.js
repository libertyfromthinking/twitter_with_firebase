import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService as auth } from 'fbase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  // console.log(auth.currentUser)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  
  useEffect(()=>{
    console.log(auth.currentUser)
    onAuthStateChanged(auth, (user)=>{
      console.log(auth.currentUser)
      if (user) {
        setIsLoggedIn(true);
      }else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  },[])

  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'initializing...'}
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
