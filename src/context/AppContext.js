import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jobsData } from '../data/jobsData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    salaryRange: '',
    experience: '',
    jobType: ''
  });

  useEffect(() => {
    loadSavedJobs();
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      setTimeout(() => {
        setJobs(jobsData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading jobs:', error);
      setLoading(false);
    }
  };

  const loadSavedJobs = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedJobs');
      if (saved) {
        setSavedJobs(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved jobs:', error);
    }
  };

  const toggleSaveJob = async (job) => {
    try {
      const isAlreadySaved = savedJobs.some(savedJob => savedJob.id === job.id);
      let updatedSavedJobs;

      if (isAlreadySaved) {
        updatedSavedJobs = savedJobs.filter(savedJob => savedJob.id !== job.id);
      } else {
        updatedSavedJobs = [...savedJobs, job];
      }

      setSavedJobs(updatedSavedJobs);
      await AsyncStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
    } catch (error) {
      console.error('Error toggling saved job:', error);
    }
  };

  const isJobSaved = (jobId) => {
    return savedJobs.some(job => job.id === jobId);
  };

  const getFilteredJobs = () => {
    let filteredJobs = jobs;

    // Apply search query
    if (searchQuery) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.category) {
      filteredJobs = filteredJobs.filter(job => job.category === filters.category);
    }

    if (filters.jobType) {
      filteredJobs = filteredJobs.filter(job => job.type === filters.jobType);
    }

    if (filters.experience) {
      filteredJobs = filteredJobs.filter(job => job.experience === filters.experience);
    }

    if (filters.salaryRange) {
      const [min, max] = filters.salaryRange.split('-').map(s => parseInt(s.replace('k', '000')));
      filteredJobs = filteredJobs.filter(job => {
        const salary = parseInt(job.salary.replace(/[^0-9]/g, ''));
        return salary >= min && salary <= max;
      });
    }

    return filteredJobs;
  };

  const value = {
    jobs,
    savedJobs,
    loading,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    toggleSaveJob,
    isJobSaved,
    getFilteredJobs,
    loadJobs
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};