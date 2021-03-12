import './App.css';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import firebaseConfig from './firebase.config';
firebase.initializeApp(firebaseConfig);
function App() {
  const provider = new firebase.auth.GoogleAuthProvider();

  const haldleSignin = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email, phone,photoURL} = res.user
      console.log(displayName, email, phone, photoURL);
    })
  }
  return (
    <div className="App">
      <button onClick={haldleSignin} >Sign in</button>
    </div>
  );
}

export default App;
