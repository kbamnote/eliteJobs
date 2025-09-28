import React, { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import JobCard from '../../components/job/JobCard';
import Loading from '../../components/common/Loading';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { 
    jobs, 
    loading, 
    toggleSaveJob, 
    loadJobs,
    getFilteredJobs 
  } = useApp();

  const filteredJobs = getFilteredJobs();

  useEffect(() => {
    loadJobs();
  }, []);

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
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-gray-600 text-base">
            Welcome back,
          </Text>
          <Text className="text-gray-900 text-xl font-bold">
            {user?.name || 'Job Seeker'}
          </Text>
        </View>
        
        <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
          <Ionicons name="notifications-outline" size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-gray-900 text-lg font-semibold">
          Recent Jobs
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Text className="text-primary font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      {filteredJobs.length > 0 && (
        <View className="bg-blue-50 rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-blue-900 font-semibold text-base mb-1">
                {filteredJobs.length} Jobs Available
              </Text>
              <Text className="text-blue-700 text-sm">
                Find your dream job today
              </Text>
            </View>
            <View className="w-12 h-12 bg-blue-200 rounded-full items-center justify-center">
              <Ionicons name="briefcase" size={24} color="#1d4ed8" />
            </View>
          </View>
        </View>
      )}
    </View>
  );

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center px-6">
      <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
        <Ionicons name="briefcase-outline" size={40} color="#9ca3af" />
      </View>
      <Text className="text-gray-900 text-xl font-semibold mb-2">No Jobs Found</Text>
      <Text className="text-gray-600 text-center mb-6">
        We couldn't find any jobs at the moment. Try refreshing or check back later.
      </Text>
      <TouchableOpacity
        onPress={loadJobs}
        className="bg-primary px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold">Refresh Jobs</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading && jobs.length === 0) {
    return <Loading text="Loading jobs..." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <FlatList
        data={filteredJobs.slice(0, 10)} // Show only first 10 jobs on home
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={loadJobs}
            colors={['#2563eb']}
            tintColor="#2563eb"
          />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;