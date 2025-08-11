# 🔥 Firebase Backend Setup Guide

## ✅ **What I've Already Done:**

1. ✅ Installed Firebase dependencies
2. ✅ Updated Android build configuration
3. ✅ Updated iOS Podfile
4. ✅ Created Firebase configuration files
5. ✅ Created Firebase service functions
6. ✅ Installed iOS pods

## 📋 **What YOU Need to Do:**

### 1. **Create Firebase Project**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `prep-interview-app`
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. **Enable Firebase Services**

In Firebase Console, enable these services:

#### **A. Authentication:**
1. Go to Authentication → Sign-in method
2. Enable "Email/Password"
3. Click "Save"

#### **B. Firestore Database:**
1. Go to Firestore Database → Create database
2. Choose "Start in test mode" (for development)
3. Select location closest to you
4. Click "Done"

#### **C. Storage (Optional - Requires Billing):**
1. Go to Storage → Get started
2. Choose "Start in test mode" (for development)
3. Select location closest to you
4. Click "Done"
**Note**: Storage requires a billing plan. The app will work without it for now.

### 3. **Get Configuration Files**

#### **For Android (`google-services.json`):**
1. Go to Firebase Console → Project Settings (gear icon)
2. Click "Add app" → Android
3. Enter package name: `com.prep`
4. Click "Register app"
5. Download `google-services.json`
6. Place it in: `android/app/google-services.json`

#### **For iOS (`GoogleService-Info.plist`):**
1. Go to Firebase Console → Project Settings (gear icon)
2. Click "Add app" → iOS
3. Enter bundle ID: `com.prep`
4. Click "Register app"
5. Download `GoogleService-Info.plist`
6. Place it in: `ios/prep/GoogleService-Info.plist`

### 4. **Update Firebase Configuration**

Replace the placeholder values in `src/config/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // From google-services.json
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

**How to get these values:**
- Open your `google-services.json` file
- Copy values from the JSON structure:
  - `apiKey`: `client[0].api_key[0].current_key`
  - `projectId`: `project_info.project_id`
  - `storageBucket`: `project_info.storage_bucket`
  - `messagingSenderId`: `project_info.project_number`
  - `appId`: `client[0].client_info.mobilesdk_app_id`

### 5. **Set Up Firestore Security Rules**

In Firebase Console → Firestore Database → Rules:

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

### 6. **Set Up Storage Rules (Optional)**

In Firebase Console → Storage → Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Note**: Only needed if you plan to use Firebase Storage (requires billing plan).

### 7. **Test the Setup**

Run the app to test Firebase integration:

```bash
# For Android
npm run android

# For iOS
npm run ios
```

## 🔧 **Firebase Services Available:**

### **Authentication:**
- `authService.signIn(email, password)`
- `authService.signUp(email, password, displayName)`
- `authService.signOut()`
- `authService.getCurrentUser()`

### **Tasks:**
- `taskService.getTasks(userId)`
- `taskService.addTask(task)`
- `taskService.updateTaskStatus(taskId, status)`
- `taskService.updateSubtask(taskId, subtaskId, completed)`

### **Users:**
- `userService.getUser(userId)`
- `userService.updateUser(userId, userData)`

### **Resources:**
- `resourceService.getTaskResources(taskId)`
- `resourceService.updateResourceBookmark(resourceId, bookmarked)`
- `resourceService.updateResourceProgress(resourceId, progress)`

### **Storage (Optional - Requires Billing):**
- Storage services are commented out to avoid billing requirements
- Can be enabled later when needed

## 🚨 **Important Notes:**

1. **Security**: The rules above are for development. For production, implement proper security rules.
2. **Billing**: Firebase has a generous free tier, but monitor usage.
3. **Backup**: Keep your `google-services.json` and `GoogleService-Info.plist` files secure.
4. **Testing**: Test all Firebase functions before deploying to production.

## 🔍 **Troubleshooting:**

- **Android build errors**: Make sure `google-services.json` is in the correct location
- **iOS build errors**: Make sure `GoogleService-Info.plist` is in the correct location
- **Authentication errors**: Check if Email/Password is enabled in Firebase Console
- **Firestore errors**: Check if Firestore is created and rules are set correctly

## 📱 **Next Steps:**

After completing this setup, you can:
1. Replace mock services with Firebase calls
2. Implement user authentication
3. Sync data with Firestore
4. Upload files to Firebase Storage
5. Add real-time updates with Firestore listeners 