# Job Search App

A comprehensive React Native job search application built with TailwindCSS and modern development practices.

## 🚀 Features

### Authentication
- **Login/Register** with email & password
- **Social login** placeholders (Google, LinkedIn)
- **Forgot password** functionality
- **Form validation** and error handling
- **Persistent authentication** using AsyncStorage

### Job Listings
- **Browse jobs** with detailed information
- **Job cards** displaying:
  - Title, Company, Location
  - Salary range
  - Job type (Full-time, Part-time, Remote)
  - Experience level
  - Posted date
- **Bookmark/Save** jobs functionality
- **Dummy job data** with 10+ sample jobs

### Search & Filter
- **Search bar** for job titles, companies, locations
- **Advanced filters**:
  - Category (Technology, Design, Management, etc.)
  - Salary range
  - Experience level (Entry, Mid, Senior)
  - Job type (Full-time, Part-time, Contract, Remote)
- **Real-time filtering** and search results
- **Filter count indicator**

### Job Details
- **Comprehensive job details** page
- **Company information**
- **Job requirements** and benefits
- **Apply button** with confirmation
- **Share job** functionality (placeholder)
- **Bookmark toggle**

### Profile Management
- **User profile** with stats
- **Saved jobs** count and management
- **Settings** and preferences (placeholders)
- **Logout** functionality

### Navigation
- **Bottom Tab Navigator**:
  - Home (Job listings)
  - Search (Search & filters)
  - Saved (Bookmarked jobs)
  - Profile (User profile)
- **Stack Navigator** for detailed views
- **Smooth transitions** and navigation

## 🛠️ Tech Stack

- **React Native** (Latest version)
- **Expo** for development and building
- **NativeWind** for TailwindCSS styling
- **React Navigation** for routing
- **AsyncStorage** for local data persistence
- **Expo Vector Icons** for icons
- **Context API** for state management

## 📱 UI/UX Design

- **Clean minimal design** with TailwindCSS
- **Consistent color scheme** (Primary: Blue #2563eb)
- **Responsive layouts** for different screen sizes
- **Professional job cards** with company logos
- **Intuitive navigation** and user experience
- **Loading states** and error handling
- **Empty states** with helpful messages

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device (for testing)

### Installation

1. **Clone the repository** (if from a repository)
   ```bash
   git clone <repository-url>
   cd JobSearchApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/emulator**
   - Scan the QR code with Expo Go app (Android/iOS)
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator (macOS only)
   - Or press `w` for web browser

## 📖 Usage Guide

### Authentication
1. **First Launch**: You'll see the login screen
2. **Register**: Tap \"Sign Up\" to create a new account
3. **Login**: Enter your credentials to access the app
4. **Forgot Password**: Use the forgot password feature if needed

### Browsing Jobs
1. **Home Screen**: View recent job listings
2. **Job Cards**: Tap any job card to view details
3. **Bookmark**: Tap the bookmark icon to save jobs
4. **Search**: Use the search tab for advanced filtering

### Searching & Filtering
1. **Search Bar**: Type job titles, companies, or locations
2. **Filters**: Tap the filter icon to open advanced filters
3. **Apply Filters**: Select your preferences and apply
4. **Clear Filters**: Reset all filters to see all jobs

### Job Details
1. **Detailed View**: See complete job information
2. **Apply**: Tap \"Apply Now\" to apply for the job
3. **Share**: Share job with others (placeholder)
4. **Bookmark**: Save/unsave jobs from the details page

### Profile Management
1. **Profile Tab**: View your profile and statistics
2. **Saved Jobs**: Access all your bookmarked jobs
3. **Settings**: Manage app preferences (placeholder)
4. **Logout**: Sign out of your account

## 🎨 Customization

### Colors
The app uses a consistent color scheme defined in `tailwind.config.js`:
- **Primary**: #2563eb (Blue)
- **Secondary**: #64748b (Gray)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Orange)
- **Error**: #ef4444 (Red)

### Adding New Jobs
To add more job data, edit `src/data/jobsData.js` and add new job objects to the `jobsData` array.

### Styling
All components use TailwindCSS classes through NativeWind. Modify the `className` props to customize appearance.

## 📁 Project Structure

```
JobSearchApp/
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   ├── common/         # Reusable components
│   │   └── job/            # Job-related components
│   ├── context/            # Context providers
│   ├── data/               # Dummy data and constants
│   ├── navigation/         # Navigation configuration
│   ├── screens/
│   │   ├── auth/           # Authentication screens
│   │   └── main/           # Main app screens
│   ├── services/           # API services (for future use)
│   ├── styles/             # Global styles
│   └── utils/              # Utility functions
├── App.js                  # Main app component
├── babel.config.js         # Babel configuration
├── tailwind.config.js      # TailwindCSS configuration
└── metro.config.js         # Metro bundler configuration
```

## 🔮 Future Enhancements

- **Real API Integration** (replace dummy data)
- **Push Notifications** for job alerts
- **Social Login** implementation
- **Resume Upload** and management
- **Job Application Tracking**
- **Company Profiles** with detailed information
- **Advanced Search** with location-based filtering
- **Dark Mode** support
- **Offline Support** with caching
- **Performance Optimizations**

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler errors**: Clear cache with `expo r -c`
2. **NativeWind not working**: Ensure babel.config.js includes NativeWind plugin
3. **Navigation issues**: Make sure all screens are properly imported
4. **AsyncStorage errors**: Check device storage permissions

### Performance Tips

- Use `FlatList` for large job lists
- Implement lazy loading for job details
- Optimize images with proper sizing
- Use React.memo for expensive components

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please create an issue in the repository or contact the development team.