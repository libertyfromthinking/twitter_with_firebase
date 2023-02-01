import React, { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (event) => {
    const {target:{value, name}} = event;
    // const {value, name} = target;

    if(name=='email'){
      setEmail(value);
      console.log(value);
    }else{
      setPassword(value);
      console.log(value);
    }
    
  }

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='Email' name='email' value={email} onChange={onChange} required/>
        <input type='password' placeholder='Password' name='password' value={password} onChange={onChange} required/>
        <input type='submit' value='Login' />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  )
}
export default Auth;