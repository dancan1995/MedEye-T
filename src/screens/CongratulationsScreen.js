// CongratulationsScreen.js
import React, { useState, useEffect } from 'react';
import { CheckCircle, Star, Calendar, Clock, Heart, Trophy } from 'lucide-react';

const CongratulationsScreen = ({ onNavigate, onLogout, user }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [streakCount] = useState(7); // Example streak
  const [adherenceRate] = useState(85);

  useEffect(() => {
    // Auto logout after 10 seconds
    const timer = setTimeout(() => {
      handleLogout();
    }, 10000);

    // Hide confetti after 3 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(confettiTimer);
    };
  }, []);

  const handleLogout = () => {
    onLogout();
    onNavigate('welcome');
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEncouragementMessage = () => {
    const messages = [
      "You're doing an amazing job staying on track with your medications!",
      "Your commitment to your health is truly inspiring!",
      "Every day you take your medications is a step toward better health!",
      "Your healthcare provider will be proud of your dedication!",
      "You're building a healthy routine that will benefit you for years to come!",
      "Consistency is key, and you're nailing it!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="bg-green-100 p-6 rounded-full w-24 h-24 mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Congratulations! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              You've successfully completed your medication recording!
            </p>
          </div>

          {/* Encouragement Message */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 font-medium">
              {getEncouragementMessage()}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-900">Streak</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{streakCount}</div>
              <div className="text-sm text-green-700">days in a row</div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Adherence</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{adherenceRate}%</div>
              <div className="text-sm text-blue-700">this month</div>
            </div>
          </div>

          {/* Recording Details */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Recording Submitted</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Date:</span>
                </div>
                <span className="font-medium">{getCurrentDate()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Time:</span>
                </div>
                <span className="font-medium">{getCurrentTime()}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-900 mb-2">What's Next?</h3>
            <ul className="text-sm text-yellow-800 text-left space-y-1">
              <li>• Your video has been securely sent to your healthcare provider</li>
              <li>• You'll receive a notification once it's reviewed</li>
              <li>• Keep taking your medications as prescribed</li>
              <li>• Return tomorrow for your next recording</li>
            </ul>
          </div>

          {/* Achievement Badges */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Today's Achievements</h3>
            <div className="flex justify-center gap-3">
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 flex flex-col items-center">
                <Star className="w-6 h-6 text-yellow-600 mb-1" />
                <span className="text-xs font-medium text-yellow-800">Consistent</span>
              </div>
              <div className="bg-green-100 border border-green-300 rounded-lg p-3 flex flex-col items-center">
                <CheckCircle className="w-6 h-6 text-green-600 mb-1" />
                <span className="text-xs font-medium text-green-800">On Time</span>
              </div>
              <div className="bg-purple-100 border border-purple-300 rounded-lg p-3 flex flex-col items-center">
                <Heart className="w-6 h-6 text-purple-600 mb-1" />
                <span className="text-xs font-medium text-purple-800">Healthy</span>
              </div>
            </div>
          </div>

          {/* Auto Logout Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-blue-800">
              For your security, you'll be automatically logged out in a few seconds.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleLogout}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Complete & Logout
            </button>
            
            <button
              onClick={() => onNavigate('medicines')}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Record Another Medication
            </button>
          </div>

          {/* Footer Message */}
          <div className="mt-6 text-xs text-gray-500">
            Thank you for using MedAdhere Pro. Stay healthy! 💊❤️
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsScreen;