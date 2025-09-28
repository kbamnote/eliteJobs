import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { savedJobs } = useApp();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };

  const profileStats = [
    {
      icon: 'bookmark',
      title: 'Saved Jobs',
      value: savedJobs.length,
      color: '#2563eb'
    },
    {
      icon: 'document-text',
      title: 'Applications',
      value: 0,
      color: '#10b981'
    },
    {
      icon: 'eye',
      title: 'Profile Views',
      value: 0,
      color: '#f59e0b'
    }
  ];

  const menuItems = [
    {
      icon: 'person-outline',
      title: 'Edit Profile',
      onPress: () => Alert.alert('Coming Soon', 'Profile editing will be available soon!')
    },
    {
      icon: 'document-text-outline',
      title: 'My Resume',
      onPress: () => Alert.alert('Coming Soon', 'Resume management will be available soon!')
    },
    {
      icon: 'notifications-outline',
      title: 'Notifications',
      onPress: () => Alert.alert('Coming Soon', 'Notification settings will be available soon!')
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      onPress: () => Alert.alert('Coming Soon', 'Help center will be available soon!')
    },
    {
      icon: 'settings-outline',
      title: 'Settings',
      onPress: () => Alert.alert('Coming Soon', 'Settings will be available soon!')
    },
    {
      icon: 'information-circle-outline',
      title: 'About',
      onPress: () => Alert.alert('About', 'Job Search App v1.0.0\nBuilt with React Native & TailwindCSS')
    }
  ];

  const renderStatCard = (stat, index) => (
    <View 
      key={index}
      className="bg-white rounded-xl p-4 items-center flex-1 mx-1 shadow-sm border border-gray-100"
    >
      <View 
        className="w-12 h-12 rounded-full items-center justify-center mb-2"
        style={{ backgroundColor: `${stat.color}20` }}
      >
        <Ionicons name={stat.icon} size={24} color={stat.color} />
      </View>
      <Text className="text-gray-900 font-bold text-lg">{stat.value}</Text>
      <Text className="text-gray-600 text-sm text-center">{stat.title}</Text>
    </View>
  );

  const renderMenuItem = (item, index) => (
    <TouchableOpacity
      key={index}
      className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between shadow-sm border border-gray-100"
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3">
          <Ionicons name={item.icon} size={20} color="#374151" />
        </View>
        <Text className="text-gray-900 font-medium text-base">{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 py-6">
          <View className="items-center mb-6">
            <View className="w-24 h-24 bg-primary rounded-full items-center justify-center mb-4">
              <Text className="text-white text-2xl font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </View>
            <Text className="text-gray-900 text-xl font-bold">{user?.name || 'User'}</Text>
            <Text className="text-gray-600 text-base">{user?.email}</Text>
          </View>

          {/* Stats */}
          <View className="flex-row mb-6">
            {profileStats.map(renderStatCard)}
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-6">
          {menuItems.map(renderMenuItem)}
          
          {/* Logout Button */}
          <TouchableOpacity
            className="bg-red-50 rounded-xl p-4 flex-row items-center justify-center mt-4 border border-red-100"
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            <Text className="text-red-500 font-semibold text-base ml-2">Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View className="px-6 py-6">
          <Text className="text-gray-500 text-center text-sm">
            Job Search App v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;