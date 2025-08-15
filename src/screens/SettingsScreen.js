// SettingsScreen.js
import React, { useState } from 'react';
import { ArrowLeft, Bell, Clock, User, Shield, LogOut, Save, Plus, Trash2 } from 'lucide-react';

const SettingsScreen = ({ onNavigate, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('reminders');
  const [notifications, setNotifications] = useState({
    medicationReminders: true,
    videoReminders: true,
    providerMessages: true,
    systemUpdates: false
  });
  
  const [reminders, setReminders] = useState([
    { id: 1, time: '08:00', enabled: true, label: 'Morning Medications' },
    { id: 2, time: '20:00', enabled: true, label: 'Evening Medications' }
  ]);

  const [profile, setProfile] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    timezone: 'America/New_York'
  });

  const [newReminder, setNewReminder] = useState({ time: '', label: '' });
  const [showAddReminder, setShowAddReminder] = useState(false);

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addReminder = () => {
    if (newReminder.time && newReminder.label) {
      setReminders(prev => [...prev, {
        id: Date.now(),
        time: newReminder.time,
        label: newReminder.label,
        enabled: true
      }]);
      setNewReminder({ time: '', label: '' });
      setShowAddReminder(false);
    }
  };

  const removeReminder = (id) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const toggleReminder = (id) => {
    setReminders(prev => prev.map(reminder =>
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    ));
  };

  const saveSettings = () => {
    // In production, save to backend
    alert('Settings saved successfully!');
  };

  const RemindersTab = () => (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Medication Reminders</h3>
          <button
            onClick={() => setShowAddReminder(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Reminder
          </button>
        </div>

        <div className="space-y-3">
          {reminders.map(reminder => (
            <div key={reminder.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="font-medium text-gray-800">{reminder.label}</div>
                  <div className="text-sm text-gray-600">{reminder.time}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reminder.enabled}
                    onChange={() => toggleReminder(reminder.id)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Enabled</span>
                </label>
                
                <button
                  onClick={() => removeReminder(reminder.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {showAddReminder && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-medium text-gray-800 mb-3">Add New Reminder</h4>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Reminder label"
                value={newReminder.label}
                onChange={(e) => setNewReminder(prev => ({ ...prev, label: e.target.value }))}
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={addReminder}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddReminder(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-800">Medication Reminders</div>
              <div className="text-sm text-gray-600">Get notified when it's time to take your medications</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.medicationReminders}
              onChange={() => handleNotificationChange('medicationReminders')}
              className="ml-4"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-800">Video Recording Reminders</div>
              <div className="text-sm text-gray-600">Reminders to record your medication videos</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.videoReminders}
              onChange={() => handleNotificationChange('videoReminders')}
              className="ml-4"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-800">Provider Messages</div>
              <div className="text-sm text-gray-600">Messages from your healthcare provider</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.providerMessages}
              onChange={() => handleNotificationChange('providerMessages')}
              className="ml-4"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-800">System Updates</div>
              <div className="text-sm text-gray-600">App updates and maintenance notifications</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.systemUpdates}
              onChange={() => handleNotificationChange('systemUpdates')}
              className="ml-4"
            />
          </label>
        </div>
      </div>
    </div>
  );

  const ProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) => handleProfileChange('firstName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) => handleProfileChange('lastName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => handleProfileChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => handleProfileChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Zone
          </label>
          <select
            value={profile.timezone}
            onChange={(e) => handleProfileChange('timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Settings</h3>
        
        <div className="space-y-4">
          <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50">
            <div className="font-medium text-gray-800">Change Password</div>
            <div className="text-sm text-gray-600">Update your account password</div>
          </button>
          
          <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50">
            <div className="font-medium text-gray-800">Two-Factor Authentication</div>
            <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
          </button>
          
          <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50">
            <div className="font-medium text-gray-800">Login History</div>
            <div className="text-sm text-gray-600">View recent login activity</div>
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy Settings</h3>
        
        <div className="space-y-4">
          <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50">
            <div className="font-medium text-gray-800">Data Export</div>
            <div className="text-sm text-gray-600">Download a copy of your data</div>
          </button>
          
          <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 text-red-600">
            <div className="font-medium">Delete Account</div>
            <div className="text-sm text-red-500">Permanently delete your account and data</div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate(user?.userType === 'provider' ? 'providerDashboard' : 'medicines')}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Settings</h1>
                <p className="text-sm text-gray-600">Manage your preferences and account</p>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex gap-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('reminders')}
            className={`py-2 px-1 border-b-2 font-medium ${
              activeTab === 'reminders'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Reminders
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-1 border-b-2 font-medium ${
              activeTab === 'profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('security')}
            className={`py-2 px-1 border-b-2 font-medium ${
              activeTab === 'security'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security & Privacy
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {activeTab === 'reminders' && <RemindersTab />}
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'security' && <SecurityTab />}

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={saveSettings}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;