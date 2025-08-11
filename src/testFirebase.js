import { firebaseAuth, firebaseFirestore } from './config/firebase';

// Test Firebase connection
export const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    
    // Test 1: Check if Firestore is accessible
    const testDoc = await firebaseFirestore
      .collection('test')
      .doc('connection-test')
      .get();
    
    console.log('✅ Firestore connection successful!');
    console.log('Document exists:', testDoc.exists);
    
    // Test 2: Check if Auth is accessible
    const currentUser = firebaseAuth.currentUser;
    console.log('✅ Auth connection successful!');
    console.log('Current user:', currentUser ? 'Logged in' : 'Not logged in');
    
    return true;
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return false;
  }
};

// Test function to add a test document
export const addTestDocument = async () => {
  try {
    await firebaseFirestore
      .collection('test')
      .doc('connection-test')
      .set({
        timestamp: new Date(),
        message: 'Firebase connection test successful!',
        projectId: 'prep-app-007'
      });
    
    console.log('✅ Test document added successfully!');
    return true;
  } catch (error) {
    console.error('❌ Failed to add test document:', error);
    return false;
  }
};

// Test authentication
export const testAuthentication = async () => {
  try {
    console.log('Testing Firebase Authentication...');
    
    // Check if auth is initialized
    if (!firebaseAuth) {
      console.error('❌ Firebase Auth not initialized');
      return false;
    }
    
    console.log('✅ Firebase Auth initialized successfully!');
    
    // Check current user
    const currentUser = firebaseAuth.currentUser;
    console.log('Current user status:', currentUser ? 'Logged in' : 'Not logged in');
    
    return true;
  } catch (error) {
    console.error('❌ Firebase Auth test failed:', error);
    return false;
  }
};

// Comprehensive Firebase test
export const runComprehensiveFirebaseTest = async () => {
  console.log('🧪 Running comprehensive Firebase test...');
  
  const results = {
    firestore: false,
    auth: false,
    config: false
  };
  
  try {
    // Test configuration
    console.log('📋 Testing Firebase configuration...');
    if (firebaseAuth && firebaseFirestore) {
      results.config = true;
      console.log('✅ Firebase configuration is correct');
    } else {
      console.log('❌ Firebase configuration has issues');
    }
    
    // Test Firestore
    console.log('🗄️ Testing Firestore...');
    try {
      await firebaseFirestore.collection('test').doc('test').get();
      results.firestore = true;
      console.log('✅ Firestore is working');
    } catch (error) {
      console.log('❌ Firestore error:', error.message);
    }
    
    // Test Auth
    console.log('🔐 Testing Authentication...');
    try {
      const currentUser = firebaseAuth.currentUser;
      results.auth = true;
      console.log('✅ Authentication is working');
    } catch (error) {
      console.log('❌ Authentication error:', error.message);
    }
    
    console.log('📊 Test Results:', results);
    return results;
    
  } catch (error) {
    console.error('❌ Comprehensive test failed:', error);
    return results;
  }
}; 