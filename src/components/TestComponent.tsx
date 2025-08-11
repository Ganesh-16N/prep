import React from 'react';
import { View, Text } from 'react-native';

const TestComponent = () => {
  return (
    <View className="bg-blue-500 p-4 rounded-lg m-4">
      <Text className="text-white font-bold text-lg">
        Tailwind is working! 🎉
      </Text>
      <Text className="text-blue-100 text-sm mt-2">
        This component uses Tailwind CSS classes
      </Text>
    </View>
  );
};

export default TestComponent; 