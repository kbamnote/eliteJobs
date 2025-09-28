import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const TestTailwind = () => {
  return (
    <StyledView className="flex-1 justify-center items-center bg-blue-500">
      <StyledText className="text-white text-2xl font-bold">
        TailwindCSS Test
      </StyledText>
      <StyledView className="mt-4 p-4 bg-white rounded-lg shadow-lg">
        <StyledText className="text-gray-900 text-lg">
          If you see blue background and styled text, TailwindCSS is working!
        </StyledText>
      </StyledView>
    </StyledView>
  );
};

export default TestTailwind;