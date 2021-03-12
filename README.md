firebase hosting
step 1: create firebase project
step 2: run command in your local project folder
  $ npm install --save firebase
step 3: crea file firebase.config.js in src folder
step 4: copy from project settings and past in firebase.config.js

const firebaseConfig = {
  apiKey: "AIzaSyBihUZHvAap8V_tRn56llpdQktotUmtwi0",
  authDomain: "ecommerce-app-a4b23.firebaseapp.com",
  projectId: "ecommerce-app-a4b23",
  storageBucket: "ecommerce-app-a4b23.appspot.com",
  messagingSenderId: "855775581148",
  appId: "1:855775581148:web:6d52fb5fd2c3f46e0af519",
  measurementId: "G-2Z9R8GHJ6B"
};

step 5: add line in firebase.config.js - export default firebaseConfig;

step 6: 
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
 in app.js

step 7: // Initialize Firebase
firebase.initializeApp(firebaseConfig); in app.js

step 8: add in app.js function,
const provider = new firebase.auth.GoogleAuthProvider();