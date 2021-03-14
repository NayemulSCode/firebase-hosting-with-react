import './App.css';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
firebase.initializeApp(firebaseConfig);
function App() {
  const [user, setUser] = useState({isSignedIn:false, name:'',email:'',password:'',photo:'',error:''});
  const [newUser, setNewUser] = useState(false);
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbprovider = new firebase.auth.FacebookAuthProvider();

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
        photo: '',
        error:'',
        success: false
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

  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateName(user.name);
        console.log(res);
      })
      .catch( error =>{
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
        console.log(error.message);
      })
    }
    if( !newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        console.log('sing in user', res.user);
      })
      .catch(err =>{
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      })
    }
    e.preventDefault()
  }
  const updateName= name =>{
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    })
    .then(() =>{
      console.log('user updated successfully');
    })
    .catch(() =>{
      console.log(error);
    })
  }
  const handleFacebookUser = () =>{
    firebase
    .auth()
    .signInWithPopup(fbprovider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // The signed-in user info.
      var user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;

      // ...
      console.log(user);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      // ...
  });
  }
  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleSignin} >Sign in</button>
      }
      <button onClick={handleFacebookUser}>logging with facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>Your email: {user.email}</p>
          {/* <p>Password: {user.password}</p> */}
          <img src={user.photo} alt="profile image"/>
        </div>
      }
      <h1>our own Authentication</h1>
      <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser"/>
      <label htmlFor="newUser">User Sign Up</label>
      <form onSubmit ={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleChange} placeholder="Enter your name"/>}
        <br />
        <input type="text" name="email" onBlur={handleChange} placeholder="Write your email" required/>
        <br/>
       <input type="password" name="password" onBlur={handleChange} placeholder="write your password" required/>
        <br/>
       <input type="submit" value={newUser ? 'Sign in': 'Sign up'}/>
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {
        user.success && <p style={{color: 'green'}}>User {newUser? 'created':'logged in '} successfully</p>
      }
    </div>
  );
}

export default App;
