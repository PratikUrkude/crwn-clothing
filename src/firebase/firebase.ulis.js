import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCP9nYnEQ6UVt2D-98ftE3c_Plv5oG_ugs",
    authDomain: "crwn-db-de3c8.firebaseapp.com",
    projectId: "crwn-db-de3c8",
    storageBucket: "crwn-db-de3c8.appspot.com",
    messagingSenderId: "418788407129",
    appId: "1:418788407129:web:37afe1aac79c1ff14d7e48",
    measurementId: "G-7NZ8XC5M6L"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
