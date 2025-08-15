// App.js - Main Application Component
import React, { useState } from 'react';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import TermsAndConditions from './src/screens/TermsAndConditions';
import MedicinesScreen from './src/screens/MedicinesScreen';
import ProviderDashboard from './src/screens/ProviderDashboard';
import RecordVideoScreen from './src/screens/RecordVideoScreen';
import CongratulationsScreen from './src/screens/CongratulationsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [user, setUser] = useState(null);
  const [navigationData, setNavigationData] = useState({});

  // Navigation handler
  const handleNavigate = (screen, data = {}) => {
    setCurrentScreen(screen);
    setNavigationData(data);
  };

  // Login handler
  const handleLogin = (userData) => {
    setUser(userData);
    console.log('User logged in:', userData);
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    setNavigationData({});
    setCurrentScreen('welcome');
    console.log('User logged out');
  };

  // Role-based access control
  const canAccessScreen = (screen) => {
    // Public screens (no login required)
    const publicScreens = ['welcome', 'login', 'signup', 'terms'];
    if (publicScreens.includes(screen)) return true;

    // Must be logged in for all other screens
    if (!user) return false;

    // Provider-only screens
    const providerOnlyScreens = ['providerDashboard'];
    if (providerOnlyScreens.includes(screen) && user.userType !== 'provider') {
      return false;
    }

    // Patient-only screens
    const patientOnlyScreens = ['medicines', 'recordVideo', 'congratulations'];
    if (patientOnlyScreens.includes(screen) && user.userType !== 'patient') {
      return false;
    }

    return true;
  };

  // Screen protection wrapper
  const renderScreen = () => {
    // Check access permissions
    if (!canAccessScreen(currentScreen)) {
      // Redirect unauthorized users
      if (!user) {
        return <LoginScreen onNavigate={handleNavigate} onLogin={handleLogin} />;
      } else if (user.userType === 'patient') {
        return (
          <MedicinesScreen 
            onNavigate={handleNavigate} 
            user={user} 
            medications={navigationData.medications || []}
          />
        );
      } else {
        return (
          <ProviderDashboard 
            onNavigate={handleNavigate} 
            user={user} 
            onLogout={handleLogout}
          />
        );
      }
    }

    // Render the requested screen
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNavigate={handleNavigate} />;
      
      case 'login':
        return <LoginScreen onNavigate={handleNavigate} onLogin={handleLogin} />;
      
      case 'signup':
        return <SignupScreen onNavigate={handleNavigate} />;
      
      case 'terms':
        return <TermsAndConditions onNavigate={handleNavigate} />;
      
      case 'medicines':
        return (
          <MedicinesScreen 
            onNavigate={handleNavigate} 
            user={user} 
            medications={navigationData.medications || []}
          />
        );
      
      case 'providerDashboard':
        return (
          <ProviderDashboard 
            onNavigate={handleNavigate} 
            user={user} 
            onLogout={handleLogout}
          />
        );
      
      case 'recordVideo':
        return (
          <RecordVideoScreen 
            onNavigate={handleNavigate} 
            user={user}
            selectedMedications={navigationData.selectedMedications || []}
          />
        );
      
      case 'congratulations':
        return (
          <CongratulationsScreen 
            onNavigate={handleNavigate} 
            onLogout={handleLogout}
            user={user}
          />
        );
      
      case 'settings':
        return (
          <SettingsScreen 
            onNavigate={handleNavigate} 
            user={user}
            onLogout={handleLogout}
          />
        );
      
      default:
        return <WelcomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
      
      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs">
          Screen: {currentScreen} | User: {user?.userType || 'none'}
        </div>
      )}
    </div>
  );
};

export default App;