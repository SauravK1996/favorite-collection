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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
   
    if(!snapshot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user ', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
