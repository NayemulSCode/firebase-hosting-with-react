import './App.css';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
firebase.initializeApp(firebaseConfig);
function App() {
  const [user, setUser] = useState({isSignedIn:false, name:'',email:'',password:'',photo:''});

  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignin = () =>{
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
  const handleSignOut =()=>{
    firebase.auth().signOut()
    .then(res =>{
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(signedOutUser);
    })
    .catch(err =>{
      console.log(err.message);
    })
  }

  const handleChange = (e) =>{
    //console.log(e.target.name,e.target.value);
    let isFormValid = true;
    if(e.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
      //console.log(isEmailValid);
    }
    if(e.target.name ==='password'){
      const isPassValidLength = e.target.value.length >= 6;
      const passwordHasNumber = /\d{2}/.test(e.target.value)
      isFormValid = isPassValidLength && passwordHasNumber;
    }
    if(isFormValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = () => {

  }
  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleSignin} >Sign in</button>
      }
      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>Your email: {user.email}</p>
          {/* <p>Password: {user.password}</p> */}
          <img src={user.photo} alt="profile image"/>
        </div>
      }
      <h1>our own Authentication</h1>
      <p>Name: {user.name}</p>
      <p>Your email: {user.email}</p>
      <p>Password: {user.password}</p>
      <form onSubmit ={handleSubmit}>
        <input type="text" name="name" onBlur={handleChange} placeholder="Enter your name"/>
        <br />
        <input type="text" name="email" onBlur={handleChange} placeholder="Write your email" required/>
        <br/>
       <input type="password" name="password" onBlur={handleChange} placeholder="write your password" required/>
        <br/>
       <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default App;
