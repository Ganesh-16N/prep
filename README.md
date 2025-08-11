# Prep - Study Companion App

A comprehensive React Native study app with Firebase backend, featuring study timers, resource management, and dark mode support.

## Features

- 🔐 **Firebase Authentication** - Secure login/signup
- 📚 **Resource Management** - Add, organize, and manage study materials
- ⏱️ **Study Timer** - Pomodoro-style study sessions with breaks
- 🌙 **Dark Mode** - Complete dark mode support
- 📱 **Cross Platform** - Works on both iOS and Android
- 🔄 **State Management** - Redux Toolkit + Zustand + React Query
- 🎨 **Modern UI** - Tailwind CSS styling with NativeWind

## Tech Stack

- **Frontend**: React Native
- **State Management**: Redux Toolkit, Zustand, React Query
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Styling**: TailwindCSS with NativeWind
- **Navigation**: React Navigation
- **Icons**: React Native Vector Icons

## Prerequisites

- Node.js (v18 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Firebase project

## Setup Instructions

### 1. Install Dependencies

```bash
cd prep
npm install
```

### 2. Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Enable Storage
5. Get your Firebase config and update `src/config/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 3. iOS Setup (macOS only)

```bash
cd ios
pod install
cd ..
```

### 4. Android Setup

Make sure you have Android Studio installed and configured with:
- Android SDK
- Android SDK Platform-Tools
- Android Emulator or physical device

### 5. Run the App

#### Android
```bash
npm run android
```

#### iOS (macOS only)
```bash
npm run ios
```

## Project Structure

```
src/
├── config/
│   └── firebase.ts          # Firebase configuration
├── navigation/
│   └── AppNavigator.tsx     # Main navigation setup
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   └── SignUpScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ResourcesScreen.tsx
│   ├── StudyScreen.tsx
│   └── ProfileScreen.tsx
├── store/
│   ├── index.ts             # Redux store configuration
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── uiSlice.ts
│   │   └── resourcesSlice.ts
│   └── zustandStore.ts      # Zustand store
└── components/              # Reusable components
```

## Key Features

### Authentication
- Email/password authentication
- Secure user sessions
- Automatic login state management

### Study Timer
- Customizable study session duration
- Break timer with notifications
- Session tracking and statistics
- Skip/pause/reset functionality

### Resource Management
- Add different types of resources (PDF, Notes, Videos, Links)
- Filter and search resources
- Delete and manage resources
- Firebase Storage integration for file uploads

### Dark Mode
- System-based dark mode detection
- Manual toggle in settings
- Consistent theming across all screens

### State Management
- **Redux Toolkit**: Authentication and resources
- **Zustand**: UI preferences and local settings
- **React Query**: Server state management and caching

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Android build issues**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

3. **iOS build issues**
   ```bash
   cd ios
   pod deintegrate
   pod install
   cd ..
   ```

4. **Firebase configuration issues**
   - Ensure all Firebase services are enabled
   - Check that your config is correctly added to `src/config/firebase.ts`
   - Verify Firestore rules allow read/write for authenticated users

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or contact the development team.
