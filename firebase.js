// Import the functions you need from the SDKs you need
import { getAuth} from "firebase/auth";
import { initializeApp, getApps, getApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import {getFirestore, getFireStore} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv7r0M_f5lVfenql3xAGnDta58YX91EcQ",
  authDomain: "whatsapp-clone-eb4c5.firebaseapp.com",
  projectId: "whatsapp-clone-eb4c5",
  storageBucket: "whatsapp-clone-eb4c5.appspot.com",
  messagingSenderId: "168034607015",
  appId: "1:168034607015:web:16c3555ba797140eaa2082"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const storage = getStorage();

const db = getFirestore();

const auth = getAuth();




export {app, db, storage, auth}
