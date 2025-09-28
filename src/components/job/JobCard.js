import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

const JobCard = ({ job, onPress, onBookmark }) => {
  const { isJobSaved } = useApp();
  const saved = isJobSaved(job.id);

  const handleBookmark = () => {
    if (onBookmark) {
      onBookmark(job);
    }
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100"
      onPress={() => onPress(job)}
      activeOpacity={0.7}
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-row items-center flex-1">
          <View className="w-12 h-12 bg-gray-100 rounded-lg items-center justify-center mr-3">
            {job.logo ? (
              <Image 
                source={{ uri: job.logo }} 
                className="w-10 h-10 rounded-lg"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-primary font-bold text-lg">
                {job.company.charAt(0)}
              </Text>
            )}
          </View>
          
          <View className="flex-1">
            <Text className="text-gray-900 font-semibold text-base" numberOfLines={1}>
              {job.title}
            </Text>
            <Text className="text-gray-600 text-sm mt-1" numberOfLines={1}>
              {job.company}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleBookmark}
          className="p-2"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color={saved ? '#2563eb' : '#64748b'}
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center mb-2">
        <Ionicons name="location-outline" size={16} color="#64748b" />
        <Text className="text-gray-600 text-sm ml-1 flex-1" numberOfLines={1}>
          {job.location}
        </Text>
        {job.remote && (
          <View className="bg-green-100 px-2 py-1 rounded-full ml-2">
            <Text className="text-green-700 text-xs font-medium">Remote</Text>
          </View>
        )}
      </View>

      <View className="flex-row items-center mb-3">
        <Ionicons name="cash-outline" size={16} color="#64748b" />
        <Text className="text-gray-600 text-sm ml-1">
          {job.salary}
        </Text>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row space-x-2">
          <View className="bg-blue-100 px-3 py-1 rounded-full">
            <Text className="text-blue-700 text-xs font-medium">{job.type}</Text>
          </View>
          <View className="bg-purple-100 px-3 py-1 rounded-full">
            <Text className="text-purple-700 text-xs font-medium">{job.experience}</Text>
          </View>
        </View>

        <Text className="text-gray-500 text-xs">
          {new Date(job.postedDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;