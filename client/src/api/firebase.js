import firebase from "firebase/app";
import { store } from "../app/store";
import "firebase/auth";
//import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// react-redux-firebase config
const rrfConfig = {
  // userProfile: "users",
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

export { auth, firebase, rrfProps };
