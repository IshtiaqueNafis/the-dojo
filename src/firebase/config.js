import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDBmbqUYisY41XFwmzUK6N4pIcJkIMqAYA",
    authDomain: "dojo-f0462.firebaseapp.com",
    projectId: "dojo-f0462",
    storageBucket: "dojo-f0462.appspot.com",
    messagingSenderId: "480062215757",
    appId: "1:480062215757:web:85683439f9902f0dadee04"
};

firebase.initializeApp(firebaseConfig);

export const projectFireStore = firebase.firestore();
export const projectAuth = firebase.auth();
export const timeStamp = firebase.firestore.Timestamp;