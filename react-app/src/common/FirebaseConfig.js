import firebase from 'firebase';
export const firebaseConfig = {
    apiKey: "PUT YOURS HERE",
    authDomain: "PUT YOURS HERE",
    databaseURL: "PUT YOURS HERE",
    projectId: "PUT YOURS HERE",
    storageBucket: "PUT YOURS HERE",
    messagingSenderId: "PUT YOURS HERE"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);

 export default firebaseApp;