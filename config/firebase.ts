// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqp4brpZRmfOjWLGeQcEFo2IOLo__gKQo",
  authDomain: "manhwa-evo-1cad5.firebaseapp.com",
  projectId: "manhwa-evo-1cad5",
  storageBucket: "manhwa-evo-1cad5.firebasestorage.app",
  messagingSenderId: "1055413892754",
  appId: "1:1055413892754:web:4ad0207a4771c257d9984b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const firestore = getFirestore(app);
