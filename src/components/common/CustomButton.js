import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

const CustomButton = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  className = '',
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary border-primary';
      case 'secondary':
        return 'bg-transparent border-primary';
      case 'success':
        return 'bg-success border-success';
      case 'error':
        return 'bg-error border-error';
      default:
        return 'bg-primary border-primary';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'py-2 px-4';
      case 'medium':
        return 'py-3 px-6';
      case 'large':
        return 'py-4 px-8';
      default:
        return 'py-3 px-6';
    }
  };

  const getTextVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'text-white';
      case 'secondary':
        return 'text-primary';
      case 'success':
        return 'text-white';
      case 'error':
        return 'text-white';
      default:
        return 'text-white';
    }
  };

  const getTextSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'medium':
        return 'text-base';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  const buttonStyles = `
    ${getVariantStyles()}
    ${getSizeStyles()}
    rounded-lg
    border-2
    items-center
    justify-center
    ${disabled || loading ? 'opacity-50' : ''}
    ${className}
  `.trim();

  const textStyles = `
    ${getTextVariantStyles()}
    ${getTextSizeStyles()}
    font-semibold
  `.trim();

  return (
    <TouchableOpacity
      className={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'secondary' ? '#2563eb' : '#ffffff'} 
          size="small" 
        />
      ) : (
        <Text className={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;