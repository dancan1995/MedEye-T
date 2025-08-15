// MedicinesScreen.js
import React, { useState } from 'react';
import { Pill, Clock, Calendar, ArrowRight, Settings, Bell } from 'lucide-react';

const MedicinesScreen = ({ onNavigate, user, medications = [] }) => {
  const [selectedMedications, setSelectedMedications] = useState([]);

  // Sample medications if none provided
  const defaultMedications = [
    {
      id: 1,
      name: 'Lisinopril 10mg',
      dosage: '1 tablet',
      frequency: 'Once daily',
      time: '08:00 AM',
      instructions: 'Take with water, preferably in the morning'
    },
    {
      id: 2,
      name: 'Metformin 500mg',
      dosage: '1 tablet',
      frequency: 'Twice daily',
      time: '08:00 AM, 08:00 PM',
      instructions: 'Take with meals to reduce stomach upset'
    },
    {
      id: 3,
      name: 'Vitamin D3 1000IU',
      dosage: '1 capsule',
      frequency: 'Once daily',
      time: '08:00 AM',
      instructions: 'Take with food for better absorption'
    }
  ];

  const currentMedications = medications.length > 0 ? medications : defaultMedications;

  const handleMedicationSelect = (medicationId) => {
    setSelectedMedications(prev => {
      if (prev.includes(medicationId)) {
        return prev.filter(id => id !== medicationId);
      } else {
        return [...prev, medicationId];
      }
    });
  };

  const handleContinue = () => {
    if (selectedMedications.length === 0) {
      alert('Please select at least one medication to record.');
      return;
    }
    
    // Pass selected medications to the next screen
    onNavigate('recordVideo', { selectedMedications });
  };

  const getTodaysDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Today's Medications</h1>
                <p className="text-sm text-gray-600">{getTodaysDate()}</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('settings')}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Welcome Message */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            Welcome back, {user?.name || 'Patient'}!
          </h2>
          <p className="text-blue-800">
            Please select the medications you're taking today and record your adherence video.
          </p>
        </div>

        {/* Medications List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Prescribed Medications</h3>
            <p className="text-gray-600">Select the medications you're taking right now</p>
          </div>

          <div className="p-6 space-y-4">
            {currentMedications.map((medication) => (
              <div
                key={medication.id}
                onClick={() => handleMedicationSelect(medication.id)}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedMedications.includes(medication.id)
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${
                        selectedMedications.includes(medication.id) ? 'bg-blue-600' : 'bg-gray-400'
                      }`}>
                        <Pill className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{medication.name}</h4>
                        <p className="text-sm text-gray-600">{medication.dosage}</p>
                      </div>
                    </div>
                    
                    <div className="ml-9 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{medication.frequency} - {medication.time}</span>
                      </div>
                      
                      <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                        {medication.instructions}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedMedications.includes(medication.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedMedications.includes(medication.id) && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reminder Section */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-900 mb-1">Reminder</h4>
              <p className="text-yellow-800 text-sm">
                Make sure you have your medications ready before starting the video recording. 
                Hold up each medication clearly to the camera during recording.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={handleContinue}
            disabled={selectedMedications.length === 0}
            className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            Continue to Video Recording
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onNavigate('settings')}
            className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Settings
          </button>
        </div>

        {/* Selected Count */}
        {selectedMedications.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {selectedMedications.length} medication{selectedMedications.length !== 1 ? 's' : ''} selected for recording
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicinesScreen;