import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage'; // Commented out - requires billing

// Firebase configuration - Updated with actual values from google-services.json
const firebaseConfig = {
  apiKey: "AIzaSyBFNiDTEJamrNI7iTFn2ZZa6WFt8txS1So",
  authDomain: "prep-app-007.firebaseapp.com",
  projectId: "prep-app-007",
  storageBucket: "prep-app-007.firebasestorage.app",
  messagingSenderId: "759383008634",
  appId: "1:759383008634:android:dc3bd886c3bdb57acce2c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const firebaseAuth = auth();
const firebaseFirestore = firestore();
// const firebaseStorage = storage(); // Commented out - requires billing

export { app, firebaseAuth, firebaseFirestore };
export default app; 