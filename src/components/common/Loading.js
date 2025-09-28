import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const Loading = ({ text = 'Loading...', size = 'large', color = '#2563eb' }) => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50">
      <ActivityIndicator size={size} color={color} />
      <Text className="text-gray-600 mt-4 text-base">{text}</Text>
    </View>
  );
};

export default Loading;