import './App.css';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
firebase.initializeApp(firebaseConfig);
function App() {
  const [user, setUser] = useState({isSignedIn:false, name:'',email:'',photo:''});

  const provider = new firebase.auth.GoogleAuthProvider();

  const haldleSignin = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email, phone,photoURL} = res.user;
      const signedInUser ={
        isSignedIn : true,
        name : displayName,
        email : email,
        photo: photoURL
      }
      setUser(signedInUser);
      console.log(displayName, email, phone, photoURL);
    })
    .catch(err => {
      console.error(err);
      console.log(err.message)
    })
  }
  return (
    <div className="App">
      <button onClick={haldleSignin} >Sign in</button>
      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="profile image"/>
        </div>
      }
    </div>
  );
}

export default App;
