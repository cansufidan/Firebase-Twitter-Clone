// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq0aXni7VJS1trLa4oTmH1XoLKoYUj2nY",
  authDomain: "twitter-52c9d.firebaseapp.com",
  projectId: "twitter-52c9d",
  storageBucket: "twitter-52c9d.appspot.com",
  messagingSenderId: "583945990957",
  appId: "1:583945990957:web:7c210b85ac80b47a5099a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);