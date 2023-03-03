import React, { ErrorInfo, MouseEventHandler, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { authService as auth } from "fbase";

const Auth = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newAccount, setNewAccount] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const onChange = (event: { target: { value: any; name: any } }) => {
    const {
      target: { value, name },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const toggleAccount = () => {
    setNewAccount(!newAccount);
  };

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const data = newAccount
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);
      console.log(`데이타 :${data}`);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const onClick = async (event: React.MouseEvent) => {
    const name = (event.target as HTMLButtonElement).name;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    } else {
      provider = new GoogleAuthProvider();
    }
    const result = await signInWithPopup(auth, provider);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <input type="submit" value={newAccount ? "Sign Up" : "Sign In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Sign Up"}</span>
      <div>
        <button name="google" onClick={onClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
