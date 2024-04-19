// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCUtKxLEl808WS3Bj8k4dhWdTXfPM4x3I",
    authDomain: "react-firebase-blog-clg1994.firebaseapp.com",
    projectId: "react-firebase-blog-clg1994",
    storageBucket: "react-firebase-blog-clg1994.appspot.com",
    messagingSenderId: "287846668758",
    appId: "1:287846668758:web:a9653f616a262c9b5b2c77",
    measurementId: "G-286P5ZBZ1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app)
