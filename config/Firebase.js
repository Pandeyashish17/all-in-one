import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDG0zEbQcSQWoA4p4ZYWBmP2ozPWX89Pz0",
  authDomain: "apis-e25b0.firebaseapp.com",
  projectId: "apis-e25b0",
  storageBucket: "apis-e25b0.appspot.com",
  messagingSenderId: "662155629795",
  appId: "1:662155629795:web:ec231a0fae7a06bb38a1d6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
