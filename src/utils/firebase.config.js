import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzp3-ackeqfzGxiwYVKNZyCXOE1x4veIw",
  authDomain: "email-password-auth-af519.firebaseapp.com",
  projectId: "email-password-auth-af519",
  storageBucket: "email-password-auth-af519.appspot.com",
  messagingSenderId: "480027479008",
  appId: "1:480027479008:web:67cf8cbf6d5c2559cdb985"
}
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth
