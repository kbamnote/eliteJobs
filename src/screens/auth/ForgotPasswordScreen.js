import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEmailSent(true);
      Alert.alert(
        'Password Reset Email Sent',
        'Please check your email for password reset instructions.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    }, 2000);
  };

  if (emailSent) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center px-6">
          <View className="w-20 h-20 bg-success rounded-full items-center justify-center mb-6">
            <Ionicons name="checkmark" size={40} color="white" />
          </View>
          
          <Text className="text-2xl font-bold text-gray-900 text-center mb-4">
            Check Your Email
          </Text>
          
          <Text className="text-gray-600 text-center text-base mb-8 leading-relaxed">
            We've sent a password reset link to {email}. Please check your email and follow the instructions to reset your password.
          </Text>

          <CustomButton
            title="Back to Login"
            onPress={() => navigation.navigate('Login')}
            className="w-full"
          />

          <TouchableOpacity
            onPress={() => setEmailSent(false)}
            className="mt-4"
          >
            <Text className="text-primary font-medium">
              Didn't receive email? Try again
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1 px-6"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mb-8"
          >
            <Ionicons name="arrow-back" size={24} color="#2563eb" />
          </TouchableOpacity>

          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
              Forgot Password?
            </Text>
            <Text className="text-gray-600 text-center text-base leading-relaxed">
              Don't worry! Enter your email address below and we'll send you a link to reset your password.
            </Text>
          </View>

          <View className="mb-6">
            <CustomInput
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              leftIcon="mail-outline"
              error={errors.email}
              autoCapitalize="none"
            />

            <CustomButton
              title="Send Reset Link"
              onPress={handleResetPassword}
              loading={loading}
              className="mb-4"
            />

            <View className="flex-row justify-center items-center">
              <Text className="text-gray-600">Remember your password? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-primary font-semibold">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;