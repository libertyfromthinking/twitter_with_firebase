import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { authService as auth} from 'fbase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);

  const onChange = (event) => {
    const { target : { value, name } } = event;

    if(name==='email'){
      setEmail(value);
      console.log(value);
    }else{
      setPassword(value);
      console.log(value);
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = newAccount ? await createUserWithEmailAndPassword(auth, email, password) : await signInWithEmailAndPassword(auth, email, password);
      console.log(`데이타 :${data}`);
    } catch(error) {
      console.log(`에라 : ${error}`);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='Email' name='email' value={email} onChange={onChange} required/>
        <input type='password' placeholder='Password' name='password' value={password} onChange={onChange} required/>
        <input type='submit' value={newAccount ? 'Sign Up' : 'Sign In'} />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  )
}
export default Auth;