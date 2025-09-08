const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Deploying Firebase Firestore Rules...\n');

// Check if Firebase CLI is installed
try {
  execSync('firebase --version', { stdio: 'pipe' });
  console.log('✅ Firebase CLI is installed');
} catch (error) {
  console.log('❌ Firebase CLI is not installed. Installing now...');
  try {
    execSync('npm install -g firebase-tools', { stdio: 'inherit' });
    console.log('✅ Firebase CLI installed successfully');
  } catch (installError) {
    console.error('❌ Failed to install Firebase CLI:', installError.message);
    console.log('\n💡 Please install Firebase CLI manually:');
    console.log('npm install -g firebase-tools');
    process.exit(1);
  }
}

// Check if user is logged in to Firebase
try {
  execSync('firebase projects:list', { stdio: 'pipe' });
  console.log('✅ Firebase CLI is authenticated');
} catch (error) {
  console.log('❌ Not logged in to Firebase. Please log in...');
  try {
    execSync('firebase login', { stdio: 'inherit' });
    console.log('✅ Successfully logged in to Firebase');
  } catch (loginError) {
    console.error('❌ Failed to login to Firebase:', loginError.message);
    process.exit(1);
  }
}

// Deploy Firestore rules
try {
  console.log('\n📝 Deploying Firestore rules...');
  execSync('firebase deploy --only firestore:rules', { stdio: 'inherit' });
  console.log('✅ Firestore rules deployed successfully!');
} catch (error) {
  console.error('❌ Failed to deploy Firestore rules:', error.message);
  console.log('\n💡 Manual deployment steps:');
  console.log('1. Go to Firebase Console: https://console.firebase.google.com/');
  console.log('2. Select your project: prep-app-007');
  console.log('3. Go to Firestore Database > Rules');
  console.log('4. Copy the rules from firestore.rules file');
  console.log('5. Paste and publish the rules');
}

// Deploy Firestore indexes
try {
  console.log('\n📊 Deploying Firestore indexes...');
  execSync('firebase deploy --only firestore:indexes', { stdio: 'inherit' });
  console.log('✅ Firestore indexes deployed successfully!');
} catch (error) {
  console.error('❌ Failed to deploy Firestore indexes:', error.message);
  console.log('\n💡 Manual deployment steps:');
  console.log('1. Go to Firebase Console: https://console.firebase.google.com/');
  console.log('2. Select your project: prep-app-007');
  console.log('3. Go to Firestore Database > Indexes');
  console.log('4. Create indexes manually if needed');
}

console.log('\n🎉 Firebase deployment completed!');
console.log('\n📋 Next steps:');
console.log('1. Test your Firebase connection again');
console.log('2. Your app should now be able to read/write to Firestore');
console.log('3. Check the Firebase Console to verify rules are active');
