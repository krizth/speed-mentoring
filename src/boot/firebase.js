
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
var firebaseConfig = {
  apiKey: "AIzaSyCz9Klee9soaOz20XD0-klKPMChh0Anztk",
  authDomain: "mentoring-5d838.firebaseapp.com",
  projectId: "mentoring-5d838",
  storageBucket: "mentoring-5d838.appspot.com",
  messagingSenderId: "571167862615",
  appId: "1:571167862615:web:78115cfab4416297fd5812"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
const auth=firebase.auth();
const timestamp =firebase.firestore.FieldValue.serverTimestamp();
export {db,auth,timestamp}
