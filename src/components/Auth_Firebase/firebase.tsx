// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAY4iWgPtNGB6XxJEkntAKX_0BkXjjZwIs",
  authDomain: "cloud-store-5051c.firebaseapp.com",
  projectId: "cloud-store-5051c",
  storageBucket: "cloud-store-5051c.appspot.com",
  messagingSenderId: "304595634739",
  appId: "1:304595634739:web:6d2c6d9ecf01a0fb9d3146"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
export default app;