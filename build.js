// Build script with full Job Search App functionality
const fs = require('fs');
const path = require('path');

console.log('Creating production build with full app features...');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Job data from your app
const jobsData = [
  {
    id: 1,
    title: "Senior React Native Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    category: "Technology",
    experience: "Senior",
    remote: true,
    logo: "https://via.placeholder.com/50x50/2563eb/ffffff?text=TC",
    postedDate: "2024-01-15"
  },
  {
    id: 2,
    title: "Frontend Developer", 
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "$80,000 - $100,000",
    type: "Full-time",
    category: "Technology",
    experience: "Mid-level",
    remote: false,
    logo: "https://via.placeholder.com/50x50/10b981/ffffff?text=SX",
    postedDate: "2024-01-14"
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignStudio", 
    location: "Los Angeles, CA",
    salary: "$70,000 - $90,000",
    type: "Full-time",
    category: "Design",
    experience: "Mid-level", 
    remote: true,
    logo: "https://via.placeholder.com/50x50/f59e0b/ffffff?text=DS",
    postedDate: "2024-01-13"
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "DataSoft Solutions",
    location: "Austin, TX", 
    salary: "$90,000 - $120,000",
    type: "Full-time",
    category: "Technology",
    experience: "Senior",
    remote: true,
    logo: "https://via.placeholder.com/50x50/ef4444/ffffff?text=DS",
    postedDate: "2024-01-12"
  },
  {
    id: 5,
    title: "Product Manager",
    company: "InnovateNow",
    location: "Seattle, WA",
    salary: "$110,000 - $140,000", 
    type: "Full-time",
    category: "Management",
    experience: "Senior",
    remote: false,
    logo: "https://via.placeholder.com/50x50/8b5cf6/ffffff?text=IN",
    postedDate: "2024-01-11"
  }
];

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job Search App</title>
  <link rel="icon" type="image/png" href="/favicon.png">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#2563eb',
            secondary: '#64748b',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
          },
        },
      },
    }
  </script>
  <style>
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }
    #root { min-height: 100vh; background-color: #f8fafc; }
    .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
  </style>
</head>
<body>
  <div id="root"></div>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script>
    const { createElement, useState, useEffect } = React;
    const { createRoot } = ReactDOM;
    
    const jobs = ${JSON.stringify(jobsData)};
    
    function App() {
      const [currentUser, setCurrentUser] = useState(null);
      const [currentScreen, setCurrentScreen] = useState('login');
      const [activeTab, setActiveTab] = useState('home');
      const [savedJobs, setSavedJobs] = useState([]);
      const [searchQuery, setSearchQuery] = useState('');
      const [selectedJob, setSelectedJob] = useState(null);
      const [loading, setLoading] = useState(false);
      
      const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const toggleSaveJob = (job) => {
        setSavedJobs(prev => {
          const isAlreadySaved = prev.find(savedJob => savedJob.id === job.id);
          if (isAlreadySaved) {
            return prev.filter(savedJob => savedJob.id !== job.id);
          } else {
            return [...prev, job];
          }
        });
      };
      
      const isJobSaved = (jobId) => savedJobs.some(job => job.id === jobId);
      
      const handleLogin = (email, password) => {
        setLoading(true);
        setTimeout(() => {
          setCurrentUser({
            name: email.split('@')[0],
            email: email
          });
          setCurrentScreen('main');
          setLoading(false);
        }, 1000);
      };
      
      const handleLogout = () => {
        setCurrentUser(null);
        setCurrentScreen('login');
        setActiveTab('home');
        setSavedJobs([]);
      };
      
      if (currentScreen === 'login') {
        return createElement(LoginScreen, { onLogin: handleLogin, loading });
      }
      
      if (selectedJob) {
        return createElement(JobDetailsScreen, { 
          job: selectedJob, 
          onBack: () => setSelectedJob(null),
          onSave: toggleSaveJob,
          isSaved: isJobSaved(selectedJob.id)
        });
      }
      
      return createElement(MainApp, {
        user: currentUser,
        activeTab,
        setActiveTab,
        jobs: filteredJobs,
        savedJobs,
        searchQuery,
        setSearchQuery,
        onJobPress: setSelectedJob,
        onSaveJob: toggleSaveJob,
        isJobSaved,
        onLogout: handleLogout
      });
    }
    
    function LoginScreen({ onLogin, loading }) {
      const [email, setEmail] = useState('demo@jobsearch.com');
      const [password, setPassword] = useState('password123');
      const [showRegister, setShowRegister] = useState(false);
      
      const handleSubmit = () => {
        if (email && password) {
          onLogin(email, password);
        }
      };
      
      if (showRegister) {
        return createElement('div', {
          className: 'min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4'
        },
          createElement('div', {
            className: 'w-full max-w-md bg-white rounded-xl shadow-lg p-8'
          },
            createElement('h1', {
              className: 'text-3xl font-bold text-center mb-6'
            }, 'Create Account'),
            createElement('div', { className: 'space-y-4' },
              createElement('input', {
                type: 'text',
                placeholder: 'Full Name',
                className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
              }),
              createElement('input', {
                type: 'email', 
                placeholder: 'Email Address',
                className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
              }),
              createElement('input', {
                type: 'password',
                placeholder: 'Password',
                className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
              }),
              createElement('button', {
                className: 'w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium',
                onClick: () => onLogin('newuser@example.com', 'password')
              }, 'Create Account'),
              createElement('button', {
                className: 'w-full text-gray-600 py-2',
                onClick: () => setShowRegister(false)
              }, 'Already have an account? Sign In')
            )
          )
        );
      }
      
      return createElement('div', {
        className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'
      },
        createElement('div', {
          className: 'w-full max-w-md bg-white rounded-xl shadow-lg p-8'
        },
          createElement('h1', {
            className: 'text-3xl font-bold text-center mb-2'
          }, 'Job Search App'),
          createElement('p', {
            className: 'text-gray-600 text-center mb-8'
          }, 'Find your dream job today'),
          createElement('div', { className: 'space-y-4' },
            createElement('input', {
              type: 'email',
              placeholder: 'Email Address', 
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            }),
            createElement('input', {
              type: 'password',
              placeholder: 'Password',
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            }),
            createElement('button', {
              className: 'w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium',
              onClick: handleSubmit,
              disabled: loading
            }, loading ? 'Signing In...' : 'Sign In'),
            createElement('button', {
              className: 'w-full text-gray-600 py-2',
              onClick: () => setShowRegister(true)
            }, 'Don\\'t have an account? Sign Up'),
            createElement('div', {
              className: 'mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700'
            }, 'Demo credentials are pre-filled. Just click Sign In!')
          )
        )
      );
    }
    
    function MainApp({ user, activeTab, setActiveTab, jobs, savedJobs, searchQuery, setSearchQuery, onJobPress, onSaveJob, isJobSaved, onLogout }) {
      const renderContent = () => {
        switch (activeTab) {
          case 'search':
            return createElement(SearchScreen, { jobs, searchQuery, setSearchQuery, onJobPress, onSaveJob, isJobSaved });
          case 'saved':
            return createElement(SavedScreen, { savedJobs, onJobPress, onSaveJob });
          case 'profile':
            return createElement(ProfileScreen, { user, onLogout, savedJobsCount: savedJobs.length });
          default:
            return createElement(HomeScreen, { user, jobs: jobs.slice(0, 5), onJobPress, onSaveJob, isJobSaved });
        }
      };
      
      return createElement('div', { className: 'min-h-screen bg-gray-50 pb-20' },
        createElement('header', { className: 'bg-white shadow-sm' },
          createElement('div', { className: 'max-w-7xl mx-auto px-4 py-4 flex justify-between items-center' },
            createElement('h1', { className: 'text-2xl font-bold text-gray-900' }, 'Job Search App'),
            createElement('button', {
              className: 'bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition',
              onClick: onLogout
            }, 'Sign Out')
          )
        ),
        createElement('main', { className: 'max-w-7xl mx-auto px-4 py-6' }, renderContent()),
        createElement(BottomNavigation, { activeTab, setActiveTab })
      );
    }
    
    function HomeScreen({ user, jobs, onJobPress, onSaveJob, isJobSaved }) {
      return createElement('div', { className: 'space-y-6' },
        createElement('div', { className: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg' },
          createElement('h2', { className: 'text-2xl font-bold mb-2' }, 'Welcome back, ' + user.name + '!'),
          createElement('p', { className: 'opacity-90' }, 'Ready to find your next opportunity?')
        ),
        createElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-4' },
          createElement('div', { className: 'bg-white p-6 rounded-lg shadow text-center' },
            createElement('div', { className: 'text-4xl mb-3' }, '🔍'),
            createElement('h3', { className: 'font-semibold mb-2' }, 'Browse Jobs'),
            createElement('p', { className: 'text-gray-600 text-sm' }, 'Discover opportunities from top companies')
          ),
          createElement('div', { className: 'bg-white p-6 rounded-lg shadow text-center' },
            createElement('div', { className: 'text-4xl mb-3' }, '🔖'),
            createElement('h3', { className: 'font-semibold mb-2' }, 'Save Favorites'),
            createElement('p', { className: 'text-gray-600 text-sm' }, 'Bookmark jobs you\\'re interested in')
          ),
          createElement('div', { className: 'bg-white p-6 rounded-lg shadow text-center' },
            createElement('div', { className: 'text-4xl mb-3' }, '📊'),
            createElement('h3', { className: 'font-semibold mb-2' }, 'Track Progress'),
            createElement('p', { className: 'text-gray-600 text-sm' }, 'Monitor your applications')
          )
        ),
        createElement('div', null,
          createElement('h3', { className: 'text-xl font-semibold mb-4' }, 'Recent Job Postings'),
          createElement('div', { className: 'space-y-4' },
            jobs.map(job => createElement(JobCard, { key: job.id, job, onPress: onJobPress, onSave: onSaveJob, isSaved: isJobSaved(job.id) }))
          )
        )
      );
    }
    
    function SearchScreen({ jobs, searchQuery, setSearchQuery, onJobPress, onSaveJob, isJobSaved }) {
      return createElement('div', { className: 'space-y-6' },
        createElement('div', { className: 'bg-white p-6 rounded-lg shadow' },
          createElement('h2', { className: 'text-xl font-semibold mb-4' }, 'Search Jobs'),
          createElement('input', {
            type: 'text',
            placeholder: 'Job title, company, or location...',
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          }),
          createElement('p', { className: 'mt-2 text-gray-600 text-sm' }, jobs.length + ' jobs found')
        ),
        createElement('div', { className: 'space-y-4' },
          jobs.map(job => createElement(JobCard, { key: job.id, job, onPress: onJobPress, onSave: onSaveJob, isSaved: isJobSaved(job.id) }))
        )
      );
    }
    
    function SavedScreen({ savedJobs, onJobPress, onSaveJob }) {
      if (savedJobs.length === 0) {
        return createElement('div', { className: 'text-center py-12' },
          createElement('div', { className: 'text-6xl mb-4' }, '🔖'),
          createElement('h2', { className: 'text-xl font-semibold mb-2' }, 'No Saved Jobs'),
          createElement('p', { className: 'text-gray-600' }, 'Jobs you bookmark will appear here')
        );
      }
      
      return createElement('div', { className: 'space-y-6' },
        createElement('h2', { className: 'text-xl font-semibold' }, 'Saved Jobs (' + savedJobs.length + ')'),
        createElement('div', { className: 'space-y-4' },
          savedJobs.map(job => createElement(JobCard, { key: job.id, job, onPress: onJobPress, onSave: onSaveJob, isSaved: true }))
        )
      );
    }
    
    function ProfileScreen({ user, onLogout, savedJobsCount }) {
      return createElement('div', { className: 'space-y-6' },
        createElement('div', { className: 'bg-white p-6 rounded-lg shadow' },
          createElement('div', { className: 'flex items-center space-x-4 mb-6' },
            createElement('div', { className: 'w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold' },
              user.name.charAt(0).toUpperCase()
            ),
            createElement('div', null,
              createElement('h2', { className: 'text-xl font-semibold' }, user.name),
              createElement('p', { className: 'text-gray-600' }, user.email)
            )
          ),
          createElement('div', { className: 'grid grid-cols-3 gap-4 text-center mb-6' },
            createElement('div', null,
              createElement('p', { className: 'text-2xl font-bold text-blue-600' }, '12'),
              createElement('p', { className: 'text-gray-600 text-sm' }, 'Applications')
            ),
            createElement('div', null,
              createElement('p', { className: 'text-2xl font-bold text-green-600' }, savedJobsCount),
              createElement('p', { className: 'text-gray-600 text-sm' }, 'Saved Jobs')
            ),
            createElement('div', null,
              createElement('p', { className: 'text-2xl font-bold text-purple-600' }, '3'),
              createElement('p', { className: 'text-gray-600 text-sm' }, 'Interviews')
            )
          ),
          createElement('button', {
            className: 'w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition',
            onClick: onLogout
          }, 'Sign Out')
        )
      );
    }
    
    function JobCard({ job, onPress, onSave, isSaved }) {
      return createElement('div', {
        className: 'bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer'
      },
        createElement('div', { className: 'flex justify-between items-start mb-4' },
          createElement('div', { className: 'flex-1', onClick: () => onPress(job) },
            createElement('h3', { className: 'text-lg font-semibold text-gray-900 mb-1' }, job.title),
            createElement('p', { className: 'text-blue-600 font-medium mb-2' }, job.company),
            createElement('div', { className: 'flex flex-wrap gap-3 text-sm text-gray-600' },
              createElement('span', null, '📍 ' + job.location),
              createElement('span', null, '💰 ' + job.salary),
              createElement('span', { className: 'px-2 py-1 bg-blue-100 text-blue-800 rounded-full' }, job.type)
            )
          ),
          createElement('button', {
            className: 'text-2xl ' + (isSaved ? 'text-red-500' : 'text-gray-400') + ' hover:text-red-500 transition',
            onClick: (e) => { e.stopPropagation(); onSave(job); }
          }, isSaved ? '❤️' : '🤍')
        ),
        createElement('p', { className: 'text-gray-500 text-sm' }, 'Posted ' + new Date(job.postedDate).toLocaleDateString())
      );
    }
    
    function JobDetailsScreen({ job, onBack, onSave, isSaved }) {
      return createElement('div', { className: 'min-h-screen bg-gray-50' },
        createElement('header', { className: 'bg-white shadow-sm' },
          createElement('div', { className: 'max-w-7xl mx-auto px-4 py-4 flex items-center' },
            createElement('button', {
              className: 'mr-4 text-gray-600 hover:text-gray-900',
              onClick: onBack
            }, '← Back'),
            createElement('h1', { className: 'text-xl font-semibold' }, 'Job Details')
          )
        ),
        createElement('div', { className: 'max-w-4xl mx-auto px-4 py-6' },
          createElement('div', { className: 'bg-white rounded-lg shadow p-8' },
            createElement('div', { className: 'flex justify-between items-start mb-6' },
              createElement('div', null,
                createElement('h1', { className: 'text-3xl font-bold text-gray-900 mb-2' }, job.title),
                createElement('p', { className: 'text-xl text-blue-600 font-medium mb-4' }, job.company),
                createElement('div', { className: 'flex flex-wrap gap-4 text-gray-600' },
                  createElement('span', null, '📍 ' + job.location),
                  createElement('span', null, '💰 ' + job.salary),
                  createElement('span', { className: 'px-3 py-1 bg-blue-100 text-blue-800 rounded-full' }, job.type),
                  createElement('span', { className: 'px-3 py-1 bg-green-100 text-green-800 rounded-full' }, job.experience)
                )
              ),
              createElement('button', {
                className: 'text-3xl ' + (isSaved ? 'text-red-500' : 'text-gray-400') + ' hover:text-red-500 transition',
                onClick: () => onSave(job)
              }, isSaved ? '❤️' : '🤍')
            ),
            createElement('div', { className: 'space-y-6' },
              createElement('div', null,
                createElement('h2', { className: 'text-xl font-semibold mb-3' }, 'Job Description'),
                createElement('p', { className: 'text-gray-700 leading-relaxed' },
                  'We are looking for a talented ' + job.title + ' to join our team at ' + job.company + '. This is an excellent opportunity to work with cutting-edge technologies and contribute to innovative projects.'
                )
              ),
              createElement('div', null,
                createElement('h2', { className: 'text-xl font-semibold mb-3' }, 'Requirements'),
                createElement('ul', { className: 'list-disc list-inside space-y-2 text-gray-700' },
                  createElement('li', null, job.experience + ' level experience in ' + job.category.toLowerCase()),
                  createElement('li', null, 'Strong communication and teamwork skills'),
                  createElement('li', null, 'Bachelor\\'s degree or equivalent experience'),
                  createElement('li', null, 'Passion for technology and continuous learning')
                )
              ),
              createElement('div', null,
                createElement('h2', { className: 'text-xl font-semibold mb-3' }, 'Benefits'),
                createElement('ul', { className: 'list-disc list-inside space-y-2 text-gray-700' },
                  createElement('li', null, 'Competitive salary and benefits'),
                  createElement('li', null, 'Health, dental, and vision insurance'),
                  createElement('li', null, 'Flexible working hours'),
                  job.remote && createElement('li', null, 'Remote work options'),
                  createElement('li', null, 'Professional development opportunities')
                )
              ),
              createElement('div', { className: 'flex gap-4 pt-6' },
                createElement('button', {
                  className: 'flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-medium',
                  onClick: () => alert('Application submitted! (Demo)')
                }, 'Apply Now'),
                createElement('button', {
                  className: 'px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition',
                  onClick: () => alert('Job shared! (Demo)')
                }, 'Share')
              )
            )
          )
        )
      );
    }
    
    function BottomNavigation({ activeTab, setActiveTab }) {
      const tabs = [
        { id: 'home', label: 'Home', icon: '🏠' },
        { id: 'search', label: 'Search', icon: '🔍' },
        { id: 'saved', label: 'Saved', icon: '🔖' },
        { id: 'profile', label: 'Profile', icon: '👤' }
      ];
      
      return createElement('div', { className: 'fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200' },
        createElement('div', { className: 'max-w-md mx-auto' },
          createElement('div', { className: 'flex justify-around py-2' },
            tabs.map(tab =>
              createElement('button', {
                key: tab.id,
                className: 'flex flex-col items-center py-2 px-3 ' + (activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'),
                onClick: () => setActiveTab(tab.id)
              },
                createElement('span', { className: 'text-xl mb-1' }, tab.icon),
                createElement('span', { className: 'text-xs' }, tab.label)
              )
            )
          )
        )
      );
    }
    
    const root = createRoot(document.getElementById('root'));
    root.render(createElement(App));
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);

const faviconSrc = path.join(__dirname, 'assets', 'favicon.png');
const faviconDest = path.join(distDir, 'favicon.png');
if (fs.existsSync(faviconSrc)) {
  fs.copyFileSync(faviconSrc, faviconDest);
}

const redirectsContent = '/* /index.html 200';
fs.writeFileSync(path.join(distDir, '_redirects'), redirectsContent);

console.log('🎉 Build completed with full Job Search App features!');
console.log('📱 Features included:');
console.log('- ✅ Login/Register screens');
console.log('- ✅ Job browsing and search');
console.log('- ✅ Save/bookmark jobs');
console.log('- ✅ Job details view');
console.log('- ✅ User profile');
console.log('- ✅ Bottom navigation');
console.log('- ✅ Responsive mobile design');
console.log('\n🚀 Ready for Vercel deployment!');