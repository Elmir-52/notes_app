// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU0HcQqfMoAhAHL6ciNNdQl3Lt7Tkqwnc",
  authDomain: "notesapp-b65f1.firebaseapp.com",
  databaseURL: "https://notesapp-b65f1-default-rtdb.firebaseio.com",
  projectId: "notesapp-b65f1",
  storageBucket: "notesapp-b65f1.firebasestorage.app",
  messagingSenderId: "182144285906",
  appId: "1:182144285906:web:f4bc25306c1d8410b5c10b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);