// Import Firebase core functions
import { initializeApp } from "firebase/app";

// (Optional for later use)
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCrQMESVopg2MslT-T_gvM2n_ka7UBEWo",
  authDomain: "careplus-48be6.firebaseapp.com",
  projectId: "careplus-48be6",
  storageBucket: "careplus-48be6.firebasestorage.app",
  messagingSenderId: "885523203802",
  appId: "1:885523203802:web:88a476ee7552d1fab187e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// (Optional for future use)
// const db = getFirestore(app);
// const storage = getStorage(app);

// Export Firebase so the rest of the app can use it
export default app;
