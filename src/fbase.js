import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_DATABASE_URL,
//     storageBucket: process.env.REACT_APP_PROJECT_ID,
//     messagingSenderId: process.env.REACT_APP_STORAGE_BUCKET,
//     appId: process.env.REACT_APP_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBWGmuBvjKcTxuTHIH8tbGY9P8qD5bY_u4",
  authDomain: "nwitter-279c4.firebaseapp.com",
  databaseURL: "https://nwitter-279c4-default-rtdb.firebaseio.com",
  projectId: "nwitter-279c4",
  storageBucket: "nwitter-279c4.appspot.com",
  messagingSenderId: "136716293192",
  appId: "1:136716293192:web:64dbd3f3a21ce5f33f747d"
};

const app = initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore(app);