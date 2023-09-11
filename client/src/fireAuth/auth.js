import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_APIKEY,
  authDomain: "bsocial-856d7.firebaseapp.com",
  projectId: "bsocial-856d7",
  storageBucket: "bsocial-856d7.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGINGID,
  appId: process.env.REACT_APP_FIREBASE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);