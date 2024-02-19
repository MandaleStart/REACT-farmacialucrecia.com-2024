import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
/* eslint-disable no-undef */
/*import dotenv from 'dotenv';
dotenv.config();*/
const firebaseConfig = {
  apiKey: "AIzaSyC7P2QNwpWg_V43iCBlAtuYutDzBYlac4Q",
  authDomain: "lucrecia-pharmacy-app.firebaseapp.com",
  projectId: "lucrecia-pharmacy-app",
  storageBucket: "lucrecia-pharmacy-app.appspot.com",
  messagingSenderId: "388114404237",
  appId: "1:388114404237:web:439d998af94e5978afa3c4"
  /*
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
*/
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };