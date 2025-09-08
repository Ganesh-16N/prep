const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFNiDTEJamrNI7iTFn2ZZa6WFt8txS1So",
  authDomain: "prep-app-007.firebaseapp.com",
  projectId: "prep-app-007",
  storageBucket: "prep-app-007.firebasestorage.app",
  messagingSenderId: "759383008634",
  appId: "1:759383008634:android:dc3bd886c3bdb57acce2c3"
};

async function testFirebaseConnection() {
  console.log('🧪 Testing Firebase Connection...\n');
  
  try {
    // Initialize Firebase
    console.log('1. Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    console.log('✅ Firebase app initialized successfully');
    
    // Test Auth
    console.log('\n2. Testing Firebase Auth...');
    const auth = getAuth(app);
    console.log('✅ Firebase Auth initialized successfully');
    console.log('Current user:', auth.currentUser ? 'Logged in' : 'Not logged in');
    
    // Test Firestore
    console.log('\n3. Testing Firestore...');
    const db = getFirestore(app);
    console.log('✅ Firestore initialized successfully');
    
    // Test Firestore connection by trying to read a document
    console.log('\n4. Testing Firestore connection...');
    const { doc, getDoc } = require('firebase/firestore');
    const testDocRef = doc(db, 'test', 'connection-test');
    const testDoc = await getDoc(testDocRef);
    
    if (testDoc.exists()) {
      console.log('✅ Firestore connection successful - document exists');
      console.log('Document data:', testDoc.data());
    } else {
      console.log('ℹ️ Firestore connection successful - test document does not exist yet');
    }
    
    // Test write operation
    console.log('\n5. Testing write operation...');
    const { setDoc } = require('firebase/firestore');
    await setDoc(testDocRef, {
      timestamp: new Date(),
      message: 'Firebase connection test successful!',
      projectId: 'prep-app-007',
      testType: 'command-line-test'
    });
    console.log('✅ Write operation successful');
    
    // Verify the write
    console.log('\n6. Verifying write operation...');
    const verifyDoc = await getDoc(testDocRef);
    if (verifyDoc.exists()) {
      console.log('✅ Write verification successful');
      console.log('Written data:', verifyDoc.data());
    }
    
    console.log('\n🎉 All Firebase tests passed! Your Firebase store is connected and working properly.');
    
  } catch (error) {
    console.error('\n❌ Firebase connection test failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    
    if (error.code === 'permission-denied') {
      console.log('\n💡 This might be a Firestore security rules issue. Check your Firestore rules in the Firebase console.');
    } else if (error.code === 'unavailable') {
      console.log('\n💡 This might be a network connectivity issue. Check your internet connection.');
    } else if (error.code === 'invalid-argument') {
      console.log('\n💡 This might be a configuration issue. Check your Firebase config.');
    }
  }
}

// Run the test
testFirebaseConnection();
