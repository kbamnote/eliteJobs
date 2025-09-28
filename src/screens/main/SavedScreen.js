import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import JobCard from '../../components/job/JobCard';

const SavedScreen = ({ navigation }) => {
  const { savedJobs, toggleSaveJob } = useApp();

  const handleJobPress = (job) => {
    navigation.navigate('JobDetails', { job });
  };

  const handleBookmark = (job) => {
    toggleSaveJob(job);
  };

  const renderJobCard = ({ item }) => (
    <JobCard
      job={item}
      onPress={handleJobPress}
      onBookmark={handleBookmark}
    />
  );

  const renderHeader = () => (
    <View className="px-6 py-4">
      <Text className="text-gray-900 text-2xl font-bold mb-2">
        Saved Jobs
      </Text>
      <Text className="text-gray-600 text-base mb-4">
        {savedJobs.length} jobs saved
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center px-6">
      <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
        <Ionicons name="bookmark-outline" size={40} color="#9ca3af" />
      </View>
      <Text className="text-gray-900 text-xl font-semibold mb-2">No Saved Jobs</Text>
      <Text className="text-gray-600 text-center mb-6">
        Start saving jobs you're interested in by tapping the bookmark icon on job cards.
      </Text>
      <TouchableOpacity
        className="bg-primary px-6 py-3 rounded-lg"
        onPress={() => navigation.navigate('Home')}
      >
        <Text className="text-white font-semibold">Browse Jobs</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <FlatList
        data={savedJobs}
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={{ 
          paddingBottom: 100,
          flexGrow: savedJobs.length === 0 ? 1 : 0 
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SavedScreen;