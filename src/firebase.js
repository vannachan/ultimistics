import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDTJf9w_tmFr3Azxe-k5qtC8MZJETA9TvY",
    authDomain: "ultimistics-app.firebaseapp.com",
    databaseURL: "https://ultimistics-app.firebaseio.com",
    projectId: "ultimistics-app",
    storageBucket: "",
    messagingSenderId: "363192461377",
    appId: "1:363192461377:web:ba0cec0fd7e030d79cfec0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


export default firebase;