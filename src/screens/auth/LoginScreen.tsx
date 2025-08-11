import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { signIn } from '../../store/slices/authSlice';
import { useAppStore } from '../../store/zustandStore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { isDarkMode } = useAppStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await dispatch(signIn({ email, password })).unwrap();
    } catch (error) {
      Alert.alert('Login Failed', error as string);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={[styles.scrollView, isDarkMode ? styles.darkContainer : styles.lightContainer]}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Icon
              name="school"
              size={80}
              color={isDarkMode ? '#3b82f6' : '#1e40af'}
            />
            <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>
              Prep
            </Text>
            <Text style={[styles.subtitle, isDarkMode ? styles.darkSubtext : styles.lightSubtext]}>
              Your Study Companion
            </Text>
          </View>

          {/* Login Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={isDarkMode ? '#94a3b8' : '#9ca3af'}
                keyboardType="email-address"
                autoCapitalize="none"
                style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>
                Password
              </Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor={isDarkMode ? '#94a3b8' : '#9ca3af'}
                  secureTextEntry={!showPassword}
                  style={[styles.input, styles.passwordInput, isDarkMode ? styles.darkInput : styles.lightInput]}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <Icon
                    name={showPassword ? 'visibility-off' : 'visibility'}
                    size={24}
                    color={isDarkMode ? '#94a3b8' : '#6b7280'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {error && (
              <Text style={styles.errorText}>
                {error}
              </Text>
            )}

            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              style={[styles.loginButton, loading ? styles.disabledButton : styles.enabledButton]}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              style={styles.signUpLink}
            >
              <Text style={[styles.signUpText, isDarkMode ? styles.darkLink : styles.lightLink]}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#111827',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 8,
  },
  lightText: {
    color: '#111827',
  },
  darkText: {
    color: '#ffffff',
  },
  lightSubtext: {
    color: '#6b7280',
  },
  darkSubtext: {
    color: '#9ca3af',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  lightInput: {
    backgroundColor: '#f9fafb',
    borderColor: '#d1d5db',
    color: '#111827',
  },
  darkInput: {
    backgroundColor: '#1f2937',
    borderColor: '#374151',
    color: '#ffffff',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    textAlign: 'center',
  },
  loginButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  enabledButton: {
    backgroundColor: '#3b82f6',
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  signUpLink: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
  },
  lightLink: {
    color: '#3b82f6',
  },
  darkLink: {
    color: '#60a5fa',
  },
});

export default LoginScreen; 