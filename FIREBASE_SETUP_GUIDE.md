# 🔥 Firebase Console Setup - Complete Guide

## 📋 **What You Need to Do (Step by Step)**

### **Step 1: Access Firebase Console**

1. **Open Browser:**
   - Go to: https://console.firebase.google.com/
   - Sign in with your Google account

### **Step 2: Create Firebase Project**

1. **Click "Create a project"**
2. **Enter Project Details:**
   - Project name: `prep-interview-app`
   - Click "Continue"
3. **Enable Google Analytics (Optional):**
   - Toggle "Enable Google Analytics for this project"
   - Click "Continue"
4. **Finish Setup:**
   - Click "Create project"
   - Wait for project creation (1-2 minutes)
   - Click "Continue"

### **Step 3: Enable Authentication**

1. **Navigate to Authentication:**
   - In left sidebar, click "Authentication"
   - Click "Get started"

2. **Enable Email/Password:**
   - Click "Sign-in method" tab
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

### **Step 4: Create Firestore Database**

1. **Navigate to Firestore:**
   - In left sidebar, click "Firestore Database"
   - Click "Create database"

2. **Choose Security Rules:**
   - Select "Start in test mode" (for development)
   - Click "Next"

3. **Choose Location:**
   - Select location closest to you (e.g., "us-central1")
   - Click "Done"

### **Step 5: Set Up Security Rules**

1. **Go to Firestore Rules:**
   - In Firestore Database, click "Rules" tab
   - Replace existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read/write tasks
    match /tasks/{taskId} {
      allow read, write: if request.auth != null;
    }
    
    // Allow authenticated users to read/write resources
    match /resources/{resourceId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

2. **Publish Rules:**
   - Click "Publish"

### **Step 6: Verify Your Setup**

1. **Check Project Settings:**
   - Click gear icon (⚙️) next to "Project Overview"
   - Click "Project settings"
   - Verify project ID: `prep-app-007`

2. **Check Your App:**
   - In "Your apps" section, verify Android app exists
   - Package name should be: `com.prep.app`

### **Step 7: Test the Connection**

1. **Run the App:**
   ```bash
   npm run android
   ```

2. **Test Firebase Connection:**
   - Open the app
   - Go to Home screen
   - Tap "Settings" in Quick Actions
   - Tap "Test Firebase"
   - You should see "✅ Connection successful!"

## ✅ **What's Already Done:**

- ✅ Firebase SDK installed
- ✅ Configuration files in place
- ✅ Android app registered
- ✅ Service layer created
- ✅ Test functions added

## 🚨 **Common Issues & Solutions:**

### **Issue 1: "Permission denied" error**
**Solution:** Make sure you've set up the security rules correctly

### **Issue 2: "Project not found" error**
**Solution:** Verify your project ID matches in `google-services.json`

### **Issue 3: "Authentication failed" error**
**Solution:** Make sure Email/Password authentication is enabled

## 📱 **Testing Your Setup:**

After completing the setup:

1. **Run the app:**
   ```bash
   npm run android
   ```

2. **Test Firebase connection:**
   - Open app
   - Go to Home screen
   - Tap "Settings" → "Test Firebase"
   - Should show "✅ Connection successful!"

3. **Test features:**
   - Try creating a task
   - Try updating task status
   - Try opening resource popups

## 🎯 **Next Steps After Setup:**

1. **Replace mock data with Firebase:**
   - Update services to use real Firebase calls
   - Implement user authentication
   - Add real-time data sync

2. **Add more features:**
   - User registration/login
   - Real-time updates
   - Offline mode
   - Push notifications

## 📞 **Need Help?**

If you encounter any issues:

1. **Check Firebase Console:**
   - Verify project exists
   - Check authentication is enabled
   - Verify Firestore is created

2. **Check App Configuration:**
   - Verify `google-services.json` is in correct location
   - Check Firebase config values match

3. **Check Console Logs:**
   - Look for Firebase connection errors
   - Check for permission errors

## 🎉 **You're All Set!**

Once you complete these steps, your app will be fully connected to Firebase and ready for real data! 