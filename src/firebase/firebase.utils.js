import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCvbQHEHs9ih5pNhL3f897ZGuM4MaTgr7M",
    authDomain: "favoritecollectiondb.firebaseapp.com",
    databaseURL: "https://favoritecollectiondb.firebaseio.com",
    projectId: "favoritecollectiondb",
    storageBucket: "favoritecollectiondb.appspot.com",
    messagingSenderId: "305240945338",
    appId: "1:305240945338:web:e17c68b2649f019d150883",
    measurementId: "G-GP3CMG9YXS"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
