import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCBU4CN68EL72TnrrG8TWSozIG_Y_Tk72o",
  authDomain: "debate-wise.firebaseapp.com",
  projectId: "debate-wise",
  storageBucket: "debate-wise.firebasestorage.app",
  messagingSenderId: "629761800858",
  appId: "1:629761800858:web:c25761d19f607e0020bd23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);