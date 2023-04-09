import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB7aR3vAWWqoPoENhnTk-V9yg0r-u-eT9o",
    authDomain: "pm25-4915e.firebaseapp.com",
    projectId: "pm25-4915e",
    storageBucket: "pm25-4915e.appspot.com",
    messagingSenderId: "145992255559",
    appId: "1:145992255559:web:2e10cf6cea50ffa0198962",
    measurementId: "G-58S4Z4F92W"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase.auth();