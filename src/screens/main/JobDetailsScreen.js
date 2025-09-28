import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import CustomButton from '../../components/common/CustomButton';

const JobDetailsScreen = ({ navigation }) => {
  const route = useRoute();
  const { job } = route.params;
  const { isJobSaved, toggleSaveJob } = useApp();
  
  const saved = isJobSaved(job.id);

  const handleBookmark = () => {
    toggleSaveJob(job);
  };

  const handleApply = () => {
    Alert.alert(
      'Apply for Job',
      `Are you sure you want to apply for ${job.title} at ${job.company}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Apply', 
          onPress: () => {
            Alert.alert(
              'Application Submitted',
              'Your application has been submitted successfully! You will be redirected to the company\'s website.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    // In a real app, you would redirect to the company's application page
                    Linking.openURL('https://example.com/apply');
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  const handleShare = () => {
    Alert.alert('Coming Soon', 'Job sharing will be available soon!');
  };

  const renderSection = (title, content) => (
    <View className="mb-6">
      <Text className="text-gray-900 font-bold text-lg mb-3">{title}</Text>
      {Array.isArray(content) ? (
        content.map((item, index) => (
          <View key={index} className="flex-row items-start mb-2">
            <View className="w-2 h-2 bg-primary rounded-full mt-2 mr-3" />
            <Text className="text-gray-700 text-base flex-1 leading-relaxed">{item}</Text>
          </View>
        ))
      ) : (
        <Text className="text-gray-700 text-base leading-relaxed">{content}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 py-6 border-b border-gray-100">
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-row items-center flex-1 mr-4">
              <View className="w-16 h-16 bg-gray-100 rounded-xl items-center justify-center mr-4">
                {job.logo ? (
                  <Image 
                    source={{ uri: job.logo }} 
                    className="w-14 h-14 rounded-xl"
                    resizeMode="cover"
                  />
                ) : (
                  <Text className="text-primary font-bold text-xl">
                    {job.company.charAt(0)}
                  </Text>
                )}
              </View>
              
              <View className="flex-1">
                <Text className="text-gray-900 font-bold text-xl mb-1" numberOfLines={2}>
                  {job.title}
                </Text>
                <Text className="text-gray-600 text-lg mb-1">{job.company}</Text>
                <View className="flex-row items-center">
                  <Ionicons name="location-outline" size={16} color="#64748b" />
                  <Text className="text-gray-600 text-base ml-1">{job.location}</Text>
                </View>
              </View>
            </View>

            <View className="flex-row space-x-2">
              <TouchableOpacity
                onPress={handleShare}
                className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
              >
                <Ionicons name="share-outline" size={20} color="#374151" />
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleBookmark}
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  saved ? 'bg-blue-100' : 'bg-gray-100'
                }`}
              >
                <Ionicons
                  name={saved ? 'bookmark' : 'bookmark-outline'}
                  size={20}
                  color={saved ? '#2563eb' : '#374151'}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Job Meta Info */}
          <View className="flex-row flex-wrap gap-2 mb-4">
            <View className="bg-blue-100 px-3 py-1 rounded-full">
              <Text className="text-blue-700 font-medium text-sm">{job.type}</Text>
            </View>
            <View className="bg-purple-100 px-3 py-1 rounded-full">
              <Text className="text-purple-700 font-medium text-sm">{job.experience}</Text>
            </View>
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-green-700 font-medium text-sm">{job.category}</Text>
            </View>
            {job.remote && (
              <View className="bg-orange-100 px-3 py-1 rounded-full">
                <Text className="text-orange-700 font-medium text-sm">Remote</Text>
              </View>
            )}
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="cash-outline" size={20} color="#2563eb" />
              <Text className="text-gray-900 font-semibold text-lg ml-2">{job.salary}</Text>
            </View>
            <Text className="text-gray-500 text-sm">
              Posted {new Date(job.postedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
          </View>
        </View>

        {/* Job Details */}
        <View className="px-6 py-6">
          {renderSection('Job Description', job.description)}
          {renderSection('Requirements', job.requirements)}
          {renderSection('Benefits', job.benefits)}
          
          {/* Company Info */}
          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            <Text className="text-gray-900 font-bold text-lg mb-2">About {job.company}</Text>
            <Text className="text-gray-700 text-base leading-relaxed">
              {job.company} is a leading company in the {job.category.toLowerCase()} industry, 
              committed to innovation and excellence. We offer competitive compensation, 
              comprehensive benefits, and opportunities for professional growth.
            </Text>
          </View>

          {/* Application Deadline */}
          {job.applicationDeadline && (
            <View className="bg-red-50 rounded-xl p-4 mb-6 border border-red-100">
              <View className="flex-row items-center">
                <Ionicons name="time-outline" size={20} color="#ef4444" />
                <Text className="text-red-700 font-semibold ml-2">Application Deadline</Text>
              </View>
              <Text className="text-red-600 mt-1">
                {new Date(job.applicationDeadline).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Apply Button */}
      <View className="px-6 py-4 bg-white border-t border-gray-100">
        <CustomButton
          title="Apply Now"
          onPress={handleApply}
          className="mb-2"
        />
        <Text className="text-gray-500 text-center text-sm">
          You'll be redirected to the company's website
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default JobDetailsScreen;