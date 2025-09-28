// App configuration constants
export const APP_CONFIG = {
  NAME: 'Job Search App',
  VERSION: '1.0.0',
  AUTHOR: 'Elite Associate',
  DESCRIPTION: 'Find your dream job with our comprehensive job search platform'
};

// API configuration (for future use)
export const API_CONFIG = {
  BASE_URL: 'https://api.jobsearch.com/v1',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
};

// Color scheme
export const COLORS = {
  PRIMARY: '#2563eb',
  SECONDARY: '#64748b',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  WHITE: '#ffffff',
  BLACK: '#000000',
  GRAY: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  }
};

// Screen dimensions and spacing
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48
};

// Font sizes
export const FONT_SIZES = {
  XS: 12,
  SM: 14,
  BASE: 16,
  LG: 18,
  XL: 20,
  XXL: 24,
  XXXL: 32
};

// Border radius
export const BORDER_RADIUS = {
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  FULL: 9999
};

// Screen names for navigation
export const SCREEN_NAMES = {
  // Auth Stack
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  
  // Main Stack
  HOME: 'Home',
  SEARCH: 'Search',
  SAVED: 'Saved',
  PROFILE: 'Profile',
  JOB_DETAILS: 'JobDetails',
  
  // Tab Navigator
  MAIN_TABS: 'MainTabs'
};

// Job-related constants
export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Remote'
];

export const EXPERIENCE_LEVELS = [
  'Entry-level',
  'Mid-level',
  'Senior',
  'Executive'
];

export const JOB_CATEGORIES = [
  'Technology',
  'Design',
  'Management',
  'Data Science',
  'Marketing',
  'Sales',
  'Finance',
  'Healthcare',
  'Education',
  'Engineering'
];

export const SALARY_RANGES = [
  '30k-50k',
  '50k-70k',
  '70k-90k',
  '90k-120k',
  '120k-150k',
  '150k+'
];

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  INVALID_CREDENTIALS: 'Invalid email or password. Please try again.',
  USER_NOT_FOUND: 'User not found. Please check your email address.',
  EMAIL_REQUIRED: 'Email address is required.',
  PASSWORD_REQUIRED: 'Password is required.',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters long.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  PASSWORDS_DONT_MATCH: 'Passwords do not match.',
  NAME_REQUIRED: 'Full name is required.',
  GENERIC_ERROR: 'Something went wrong. Please try again.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back! You have successfully logged in.',
  REGISTER_SUCCESS: 'Account created successfully! Welcome to Job Search App.',
  PASSWORD_RESET_SENT: 'Password reset instructions have been sent to your email.',
  JOB_SAVED: 'Job has been saved to your bookmarks.',
  JOB_UNSAVED: 'Job has been removed from your bookmarks.',
  APPLICATION_SUBMITTED: 'Your application has been submitted successfully!'
};

// Local storage keys
export const STORAGE_KEYS = {
  USER_DATA: 'userData',
  SAVED_JOBS: 'savedJobs',
  SEARCH_HISTORY: 'searchHistory',
  APP_SETTINGS: 'appSettings',
  ONBOARDING_COMPLETED: 'onboardingCompleted'
};

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  SHORT: 200,
  MEDIUM: 300,
  LONG: 500
};

// Debounce delays (in milliseconds)
export const DEBOUNCE_DELAY = {
  SEARCH: 300,
  API_CALL: 500
};