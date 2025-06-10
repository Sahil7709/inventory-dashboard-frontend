import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNk-RJUlDhXVyG3LY3zRcQ1KIIYkU1LKg",
  authDomain: "inventory-dashboard-1d793.firebaseapp.com",
  projectId: "inventory-dashboard-1d793",
  storageBucket: "inventory-dashboard-1d793.firebasestorage.app",
  messagingSenderId: "27021232996",
  appId: "1:27021232996:web:8b9137e37cd0ce41368871",
  measurementId: "G-Q8G3L9HXJQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
