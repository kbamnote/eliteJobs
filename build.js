// Simple build script for Vercel deployment
const fs = require('fs');
const path = require('path');

console.log('Creating production build...');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create a simple HTML file that loads the React app
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job Search App</title>
  <link rel="icon" type="image/png" href="/favicon.png">
  <style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    }
    
    #root {
      height: 100vh;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script crossorigin src="https://unpkg.com/browse/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script>
    // This is a simplified version for demo purposes
    // In production, you'd have your bundled React app here
    const { createElement, useState } = React;
    const { createRoot } = ReactDOM;
    
    function App() {
      const [currentScreen, setCurrentScreen] = useState('login');
      
      const LoginScreen = () => createElement('div', {
        className: 'flex min-h-screen bg-gray-50 items-center justify-center p-4'
      }, 
        createElement('div', {
          className: 'w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-md'
        },
          createElement('h1', {
            className: 'text-2xl font-bold text-center text-gray-900'
          }, 'Job Search App'),
          createElement('p', {
            className: 'text-center text-gray-600'
          }, 'Welcome to your job search companion'),
          createElement('button', {
            className: 'w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200',
            onClick: () => setCurrentScreen('home')
          }, 'Enter App (Demo)')
        )
      );
      
      const HomeScreen = () => createElement('div', {
        className: 'min-h-screen bg-gray-50'
      },
        createElement('div', {
          className: 'bg-white shadow-sm'
        },
          createElement('div', {
            className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'
          },
            createElement('h1', {
              className: 'text-2xl font-bold text-gray-900'
            }, 'Job Search App'),
            createElement('p', {
              className: 'text-gray-600 mt-1'
            }, 'Find your dream job today')
          )
        ),
        createElement('div', {
          className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
        },
          createElement('div', {
            className: 'bg-white rounded-lg shadow p-6 mb-6'
          },
            createElement('h2', {
              className: 'text-lg font-semibold mb-4'
            }, 'Welcome to Job Search App!'),
            createElement('p', {
              className: 'text-gray-600 mb-4'
            }, 'This is a React Native app built with Expo, deployed as a web app on Vercel.'),
            createElement('div', {
              className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            },
              createElement('div', {
                className: 'bg-blue-50 p-4 rounded-lg'
              },
                createElement('h3', {
                  className: 'font-semibold text-blue-900'
                }, 'Browse Jobs'),
                createElement('p', {
                  className: 'text-blue-700 text-sm mt-1'
                }, 'Discover thousands of job opportunities')
              ),
              createElement('div', {
                className: 'bg-green-50 p-4 rounded-lg'
              },
                createElement('h3', {
                  className: 'font-semibold text-green-900'
                }, 'Save Favorites'),
                createElement('p', {
                  className: 'text-green-700 text-sm mt-1'
                }, 'Bookmark jobs you are interested in')
              ),
              createElement('div', {
                className: 'bg-purple-50 p-4 rounded-lg'
              },
                createElement('h3', {
                  className: 'font-semibold text-purple-900'
                }, 'Track Applications'),
                createElement('p', {
                  className: 'text-purple-700 text-sm mt-1'
                }, 'Manage your job applications')
              )
            )
          ),
          createElement('button', {
            className: 'bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200',
            onClick: () => setCurrentScreen('login')
          }, 'Back to Login')
        )
      );
      
      return currentScreen === 'login' ? LoginScreen() : HomeScreen();
    }
    
    const root = createRoot(document.getElementById('root'));
    root.render(createElement(App));
  </script>
</body>
</html>
`;

// Write the HTML file
fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);

// Copy favicon if it exists
const faviconSrc = path.join(__dirname, 'assets', 'favicon.png');
const faviconDest = path.join(distDir, 'favicon.png');
if (fs.existsSync(faviconSrc)) {
  fs.copyFileSync(faviconSrc, faviconDest);
}

console.log('Build completed successfully!');
console.log('Output directory: dist/');