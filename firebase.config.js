
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC4GpUorSoDz8yWlH5Hi93KCheGxk6JY0Y",
  authDomain: "teste-entrevista-37343.firebaseapp.com",
  projectId: "teste-entrevista-37343",
  storageBucket: "teste-entrevista-37343.appspot.com",
  messagingSenderId: "395904324077",
  appId: "1:395904324077:web:71ccfc5fc076e3626457e4"
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);