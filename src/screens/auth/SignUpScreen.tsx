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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { signUp } from '../../store/slices/authSlice';
import { useAppStore } from '../../store/zustandStore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SignUpScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { isDarkMode } = useAppStore();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      await dispatch(signUp({ email, password })).unwrap();
    } catch (error) {
      Alert.alert('Sign Up Failed', error as string);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
      >
        <View className="flex-1 justify-center px-6">
          {/* Header */}
          <View className="items-center mb-8">
            <Icon
              name="school"
              size={80}
              color={isDarkMode ? '#3b82f6' : '#1e40af'}
            />
            <Text className={`text-3xl font-bold mt-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Join Prep
            </Text>
            <Text className={`text-lg mt-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Create your account
            </Text>
          </View>

          {/* Sign Up Form */}
          <View className="space-y-4">
            <View>
              <Text className={`text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={isDarkMode ? '#94a3b8' : '#9ca3af'}
                keyboardType="email-address"
                autoCapitalize="none"
                className={`px-4 py-3 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              />
            </View>

            <View>
              <Text className={`text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password
              </Text>
              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor={isDarkMode ? '#94a3b8' : '#9ca3af'}
                  secureTextEntry={!showPassword}
                  className={`px-4 py-3 rounded-lg border pr-12 ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  <Icon
                    name={showPassword ? 'visibility-off' : 'visibility'}
                    size={24}
                    color={isDarkMode ? '#94a3b8' : '#6b7280'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text className={`text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Confirm Password
              </Text>
              <View className="relative">
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  placeholderTextColor={isDarkMode ? '#94a3b8' : '#9ca3af'}
                  secureTextEntry={!showConfirmPassword}
                  className={`px-4 py-3 rounded-lg border pr-12 ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3"
                >
                  <Icon
                    name={showConfirmPassword ? 'visibility-off' : 'visibility'}
                    size={24}
                    color={isDarkMode ? '#94a3b8' : '#6b7280'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {error && (
              <Text className="text-red-500 text-sm text-center">
                {error}
              </Text>
            )}

            <TouchableOpacity
              onPress={handleSignUp}
              disabled={loading}
              className={`py-3 rounded-lg ${
                loading
                  ? 'bg-gray-400'
                  : 'bg-blue-600'
              }`}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {loading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              className="py-3"
            >
              <Text className={`text-center ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Already have an account? Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen; 