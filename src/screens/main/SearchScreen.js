import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import JobCard from '../../components/job/JobCard';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import Loading from '../../components/common/Loading';
import { categories, jobTypes, experienceLevels, salaryRanges } from '../../data/jobsData';

const SearchScreen = ({ navigation }) => {
  const { 
    searchQuery, 
    setSearchQuery, 
    filters, 
    setFilters, 
    getFilteredJobs, 
    toggleSaveJob,
    loading 
  } = useApp();
  
  const [showFilters, setShowFilters] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  const filteredJobs = getFilteredJobs();

  const handleJobPress = (job) => {
    navigation.navigate('JobDetails', { job });
  };

  const handleBookmark = (job) => {
    toggleSaveJob(job);
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    const emptyFilters = {
      category: '',
      salaryRange: '',
      experience: '',
      jobType: ''
    };
    setTempFilters(emptyFilters);
    setFilters(emptyFilters);
    setShowFilters(false);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  const renderJobCard = ({ item }) => (
    <JobCard
      job={item}
      onPress={handleJobPress}
      onBookmark={handleBookmark}
    />
  );

  const renderFilterOption = (title, options, filterKey) => (
    <View className="mb-6">
      <Text className="text-gray-900 font-semibold text-base mb-3">{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row space-x-2">
          <TouchableOpacity
            className={`px-4 py-2 rounded-full border ${
              tempFilters[filterKey] === '' 
                ? 'bg-primary border-primary' 
                : 'bg-white border-gray-300'
            }`}
            onPress={() => setTempFilters({...tempFilters, [filterKey]: ''})}
          >
            <Text className={`font-medium ${
              tempFilters[filterKey] === '' ? 'text-white' : 'text-gray-700'
            }`}>
              All
            </Text>
          </TouchableOpacity>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              className={`px-4 py-2 rounded-full border ${
                tempFilters[filterKey] === option 
                  ? 'bg-primary border-primary' 
                  : 'bg-white border-gray-300'
              }`}
              onPress={() => setTempFilters({...tempFilters, [filterKey]: option})}
            >
              <Text className={`font-medium ${
                tempFilters[filterKey] === option ? 'text-white' : 'text-gray-700'
              }`}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderHeader = () => (
    <View className="px-6 py-4">
      <Text className="text-gray-900 text-2xl font-bold mb-4">
        Find Your Dream Job
      </Text>
      
      <View className="flex-row space-x-3 mb-4">
        <View className="flex-1">
          <CustomInput
            placeholder="Search jobs, companies..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon="search-outline"
          />
        </View>
        
        <TouchableOpacity
          className={`w-12 h-12 rounded-lg items-center justify-center border-2 ${
            getActiveFiltersCount() > 0 
              ? 'bg-primary border-primary' 
              : 'bg-white border-gray-300'
          }`}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons 
            name="options-outline" 
            size={20} 
            color={getActiveFiltersCount() > 0 ? 'white' : '#64748b'} 
          />
          {getActiveFiltersCount() > 0 && (
            <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">
                {getActiveFiltersCount()}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Text className="text-gray-600 text-base mb-4">
        {filteredJobs.length} jobs found
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center px-6">
      <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
        <Ionicons name="search-outline" size={40} color="#9ca3af" />
      </View>
      <Text className="text-gray-900 text-xl font-semibold mb-2">No Jobs Found</Text>
      <Text className="text-gray-600 text-center mb-6">
        Try adjusting your search criteria or filters to find more results.
      </Text>
      <TouchableOpacity
        onPress={clearFilters}
        className="bg-primary px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold">Clear Filters</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <Loading text="Searching jobs..." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <FlatList
        data={filteredJobs}
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Filters Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Text className="text-primary font-semibold text-base">Cancel</Text>
            </TouchableOpacity>
            <Text className="text-gray-900 font-bold text-lg">Filters</Text>
            <TouchableOpacity onPress={clearFilters}>
              <Text className="text-red-500 font-semibold text-base">Clear</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 px-6 py-6">
            {renderFilterOption('Category', categories, 'category')}
            {renderFilterOption('Job Type', jobTypes, 'jobType')}
            {renderFilterOption('Experience Level', experienceLevels, 'experience')}
            {renderFilterOption('Salary Range', salaryRanges, 'salaryRange')}
          </ScrollView>

          <View className="px-6 py-4 border-t border-gray-200">
            <CustomButton
              title={`Apply Filters (${Object.values(tempFilters).filter(v => v !== '').length})`}
              onPress={applyFilters}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default SearchScreen;