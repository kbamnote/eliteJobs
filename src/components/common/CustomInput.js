import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const inputContainerStyles = `
    flex-row
    items-center
    border-2
    rounded-lg
    px-4
    py-3
    bg-white
    ${isFocused ? 'border-primary' : error ? 'border-error' : 'border-gray-300'}
    ${className}
  `.trim();

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-gray-700 font-medium mb-2">{label}</Text>
      )}
      
      <View className={inputContainerStyles}>
        {leftIcon && (
          <Ionicons 
            name={leftIcon} 
            size={20} 
            color={isFocused ? '#2563eb' : '#64748b'} 
            style={{ marginRight: 10 }}
          />
        )}
        
        <TextInput
          className="flex-1 text-gray-900 text-base"
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity onPress={handleTogglePassword}>
            <Ionicons 
              name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
              size={20} 
              color="#64748b" 
            />
          </TouchableOpacity>
        )}
        
        {rightIcon && !secureTextEntry && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Ionicons 
              name={rightIcon} 
              size={20} 
              color="#64748b" 
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text className="text-error text-sm mt-1 ml-1">{error}</Text>
      )}
    </View>
  );
};

export default CustomInput;