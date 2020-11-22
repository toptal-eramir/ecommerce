import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCmqh9hvZjVePQAicu7dgV2LlPvqJrGgPI",
    authDomain: "ecommerce-f2c9a.firebaseapp.com",
    databaseURL: "https://ecommerce-f2c9a.firebaseio.com",
    projectId: "ecommerce-f2c9a",
    storageBucket: "ecommerce-f2c9a.appspot.com",
    messagingSenderId: "176708836196",
    appId: "1:176708836196:web:8a6ad12d3b1a8f1b36b871"
  };


  export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      }
      catch(error){
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);


  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;