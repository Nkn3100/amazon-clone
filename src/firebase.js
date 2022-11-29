import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import firebase from "firebase/compat/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAheE_IKE3HmRLh_uUtoeRV2oAUfII8dNI",
  authDomain: "challenge-afe06.firebaseapp.com",
  projectId: "challenge-afe06",
  storageBucket: "challenge-afe06.appspot.com",
  messagingSenderId: "447719252041",
  appId: "1:447719252041:web:d4fe89c31038e40066df98",
  measurementId: "G-QNEKRBZM5Q"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};