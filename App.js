import React from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import './src/styles/global.css';
import { AuthProvider } from './src/context/AuthContext';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import TestTailwind from './src/components/common/TestTailwind';

export default function App() {
  // Temporarily show test component to verify TailwindCSS
  // Remove this after testing
  const SHOW_TAILWIND_TEST = false;
  
  if (SHOW_TAILWIND_TEST) {
    return (
      <>
        <TestTailwind />
        <StatusBar style="auto" />
      </>
    );
  }

  return (
    <AuthProvider>
      <AppProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </AppProvider>
    </AuthProvider>
  );
}
