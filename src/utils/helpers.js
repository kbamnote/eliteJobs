// Date formatting utilities
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

// Salary formatting
export const formatSalary = (salary) => {
  if (typeof salary === 'string') return salary;
  return `$${salary.toLocaleString()}`;
};

// String utilities
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

// Color utilities for job categories
export const getCategoryColor = (category) => {
  const colors = {
    'Technology': '#2563eb',
    'Design': '#8b5cf6',
    'Management': '#f59e0b',
    'Data Science': '#10b981',
    'Marketing': '#ec4899',
    'Sales': '#ef4444'
  };
  return colors[category] || '#64748b';
};

// Search and filter utilities
export const filterJobs = (jobs, searchQuery, filters) => {
  let filteredJobs = [...jobs];

  // Apply search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.category.toLowerCase().includes(query)
    );
  }

  // Apply filters
  Object.keys(filters).forEach(key => {
    if (filters[key]) {
      switch (key) {
        case 'category':
          filteredJobs = filteredJobs.filter(job => job.category === filters[key]);
          break;
        case 'jobType':
          filteredJobs = filteredJobs.filter(job => job.type === filters[key]);
          break;
        case 'experience':
          filteredJobs = filteredJobs.filter(job => job.experience === filters[key]);
          break;
        case 'salaryRange':
          const [min, max] = filters[key].split('-').map(s => 
            parseInt(s.replace('k', '000').replace('+', ''))
          );
          filteredJobs = filteredJobs.filter(job => {
            const salary = parseInt(job.salary.replace(/[^0-9]/g, ''));
            if (filters[key].includes('+')) {
              return salary >= min;
            }
            return salary >= min && salary <= max;
          });
          break;
      }
    }
  });

  return filteredJobs;
};

// AsyncStorage key constants
export const STORAGE_KEYS = {
  USER: 'user',
  SAVED_JOBS: 'savedJobs',
  APP_SETTINGS: 'appSettings',
  SEARCH_HISTORY: 'searchHistory'
};