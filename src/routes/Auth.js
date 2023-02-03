import React, { useState } from 'react';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { authService as auth} from 'fbase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState(false);

  const onChange = (event) => {
    const { target : { value, name } } = event;
    if(name==='email'){
      setEmail(value);
    }else{
      setPassword(value);
    }
  }

  const toggleAccount = () => {setNewAccount(!newAccount)};

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = newAccount ? await createUserWithEmailAndPassword(auth, email, password) : await signInWithEmailAndPassword(auth, email, password);
      console.log(`데이타 :${data}`);
    } catch(e) {
      setError(e.message);
    }
  }
  
  const onClick = async (event) => {
    const { target : { name }} = event;
    let provider;
    if (name==='google') {
      provider = new GoogleAuthProvider();
      
    } else if (name==='github') {
      provider = new GithubAuthProvider();
    }
    const result = await signInWithPopup(auth, provider);
    console.log(`result : ${result}`);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='Email' name='email' value={email} onChange={onChange} required/>
        <input type='password' placeholder='Password' name='password' value={password} onChange={onChange} required/>
        <input type='submit' value={newAccount ? 'Sign Up' : 'Sign In'} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? 'Sign In' : 'Sign Up'}</span>
      <div>
        <button name='google' onClick={onClick}>Continue with Google</button>
        <button name='github' onClick={onClick}>Continue with Github</button>
      </div>
    </div>
  )
}
export default Auth;