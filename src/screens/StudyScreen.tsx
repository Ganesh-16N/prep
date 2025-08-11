import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useAppStore } from '../store/zustandStore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StudyScreen = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { isDarkMode, studySessionDuration, breakDuration } = useAppStore();
  
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(studySessionDuration * 60);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Session completed
            if (!isBreak) {
              // Study session completed, start break
              setIsBreak(true);
              setTimeLeft(breakDuration * 60);
              setSessions(prev => prev + 1);
              Alert.alert(
                'Study Session Complete!',
                'Great job! Take a break now.',
                [{ text: 'OK' }]
              );
            } else {
              // Break completed, start new study session
              setIsBreak(false);
              setTimeLeft(studySessionDuration * 60);
              Alert.alert(
                'Break Complete!',
                'Ready for your next study session?',
                [{ text: 'OK' }]
              );
            }
            return isBreak ? studySessionDuration * 60 : breakDuration * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isBreak, studySessionDuration, breakDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Timer',
      'Are you sure you want to reset the timer?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setIsActive(false);
            setIsBreak(false);
            setTimeLeft(studySessionDuration * 60);
            setSessions(0);
          },
        },
      ]
    );
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Session',
      `Are you sure you want to skip this ${isBreak ? 'break' : 'study session'}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Skip',
          onPress: () => {
            if (isBreak) {
              setIsBreak(false);
              setTimeLeft(studySessionDuration * 60);
            } else {
              setIsBreak(true);
              setTimeLeft(breakDuration * 60);
              setSessions(prev => prev + 1);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <View className="p-6">
        {/* Header */}
        <View className="items-center mb-8">
          <Text className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Study Timer
          </Text>
          <Text className={`text-lg mt-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {isBreak ? 'Break Time' : 'Focus Time'}
          </Text>
        </View>

        {/* Timer Display */}
        <View className={`items-center p-8 rounded-2xl mb-8 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <Text className={`text-6xl font-bold font-mono ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {formatTime(timeLeft)}
          </Text>
          <Text className={`text-lg mt-4 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {isBreak ? 'Take a break!' : 'Stay focused!'}
          </Text>
        </View>

        {/* Controls */}
        <View className="flex-row justify-center space-x-4 mb-8">
          {!isActive ? (
            <TouchableOpacity
              onPress={handleStart}
              className="bg-green-600 px-8 py-3 rounded-lg flex-row items-center"
            >
              <Icon name="play-arrow" size={24} color="#ffffff" />
              <Text className="text-white font-semibold text-lg ml-2">
                Start
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handlePause}
              className="bg-yellow-600 px-8 py-3 rounded-lg flex-row items-center"
            >
              <Icon name="pause" size={24} color="#ffffff" />
              <Text className="text-white font-semibold text-lg ml-2">
                Pause
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleReset}
            className="bg-red-600 px-6 py-3 rounded-lg flex-row items-center"
          >
            <Icon name="refresh" size={24} color="#ffffff" />
            <Text className="text-white font-semibold text-lg ml-2">
              Reset
            </Text>
          </TouchableOpacity>
        </View>

        {/* Skip Button */}
        <TouchableOpacity
          onPress={handleSkip}
          className={`p-3 rounded-lg items-center mb-8 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}
        >
          <Text className={`font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Skip {isBreak ? 'Break' : 'Session'}
          </Text>
        </TouchableOpacity>

        {/* Stats */}
        <View className={`p-6 rounded-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <Text className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Study Stats
          </Text>
          
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {sessions}
              </Text>
              <Text className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Sessions
              </Text>
            </View>
            
            <View className="items-center">
              <Text className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {sessions * studySessionDuration}
              </Text>
              <Text className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Minutes
              </Text>
            </View>
            
            <View className="items-center">
              <Text className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {studySessionDuration}
              </Text>
              <Text className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Min/Session
              </Text>
            </View>
          </View>
        </View>

        {/* Tips */}
        <View className={`p-6 rounded-lg mt-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <Text className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Study Tips
          </Text>
          
          <View className="space-y-3">
            <View className="flex-row items-start">
              <Icon name="lightbulb" size={20} color="#f59e0b" />
              <Text className={`flex-1 ml-3 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Find a quiet place to study without distractions
              </Text>
            </View>
            
            <View className="flex-row items-start">
              <Icon name="lightbulb" size={20} color="#f59e0b" />
              <Text className={`flex-1 ml-3 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Take regular breaks to maintain focus
              </Text>
            </View>
            
            <View className="flex-row items-start">
              <Icon name="lightbulb" size={20} color="#f59e0b" />
              <Text className={`flex-1 ml-3 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Stay hydrated and take care of yourself
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default StudyScreen; 