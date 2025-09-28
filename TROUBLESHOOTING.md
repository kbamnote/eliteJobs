# Job Search App - Troubleshooting Guide

## 🔧 Fix "Internet Connection Offline" Error

### **Method 1: Use Web Version (Recommended)**
```bash
# Run this command in your terminal:
npx expo start --web
```
This will open the app directly in your web browser.

### **Method 2: Use Tunnel Connection**
```bash
# Clear cache and use tunnel:
npx expo start --tunnel --clear
```
When prompted about port, type `Y` and press Enter.

### **Method 3: Use LAN Connection**
```bash
# Use LAN instead of default:
npx expo start --lan
```

### **Method 4: Use Localhost**
```bash
# Use localhost for testing:
npx expo start --localhost
```

### **Method 5: Reset Metro Cache**
```bash
# Clear all caches:
npx expo start --clear --reset-cache
```

## 📱 **Testing on Physical Device**

### **For Android:**
1. Install Expo Go from Google Play Store
2. Make sure your phone and computer are on the same WiFi network
3. Scan the QR code or use the tunnel URL

### **For iOS:**
1. Install Expo Go from App Store
2. Use the Camera app to scan the QR code
3. Or use the tunnel URL in Safari

## 🌐 **Web Testing (Easiest)**
If you're having network issues, the web version is the most reliable:

```bash
npx expo start --web
```

## 🔍 **Network Troubleshooting**

1. **Check Firewall**: Disable Windows Firewall temporarily
2. **Check Antivirus**: Add Expo to whitelist
3. **Check WiFi**: Ensure both devices are on same network
4. **Check Port**: Default port 8081 might be blocked
5. **Check VPN**: Disable VPN if active

## 🚀 **Quick Start Commands**

### Start with Web (Most Reliable)
```bash
cd "D:\Elite Associate\JobSearchApp"
npx expo start --web
```

### Start with Tunnel (For Mobile)
```bash
cd "D:\Elite Associate\JobSearchApp"
npx expo start --tunnel
```

### Start with LAN
```bash
cd "D:\Elite Associate\JobSearchApp"
npx expo start --lan
```

## 📋 **If Still Having Issues**

1. **Restart Command Prompt as Administrator**
2. **Clear Node Modules:**
   ```bash
   rm -rf node_modules
   npm install
   ```
3. **Update Expo CLI:**
   ```bash
   npm install -g @expo/cli@latest
   ```

## 🎯 **Recommended Approach**

For immediate testing, use the web version:
```bash
npx expo start --web
```

This bypasses all network connectivity issues and runs directly in your browser.