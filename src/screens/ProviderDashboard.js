// ProviderDashboard.js
import React, { useState } from 'react';
import { 
  Users, Plus, Search, Filter, Video, Check, X, Clock, Pill, Calendar, Settings, LogOut, 
  Eye, Download, AlertTriangle, TrendingUp, Activity, FileText, Bell, Edit, Trash2,
  ChevronDown, ChevronRight, Star, Phone, Mail, MapPin, Shield
} from 'lucide-react';

const ProviderDashboard = ({ onNavigate, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showAddMedicationModal, setShowAddMedicationModal] = useState(false);
  const [expandedPatient, setExpandedPatient] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    medicalHistory: ''
  });

  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    time: '',
    instructions: '',
    startDate: '',
    endDate: '',
    refills: ''
  });

  // Comprehensive sample data
  const [patients, setPatients] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '(555) 123-4567',
      dateOfBirth: '1985-03-15',
      address: '123 Main St, Grand Rapids, MI 49503',
      emergencyContact: 'Jane Doe - (555) 123-4568',
      lastActive: '2025-08-15',
      adherenceRate: 85,
      status: 'active',
      riskLevel: 'low',
      nextAppointment: '2025-08-20',
      totalMedications: 3,
      completedVideos: 28,
      missedDoses: 4,
      medications: [
        { 
          id: 1, 
          name: 'Lisinopril', 
          dosage: '10mg', 
          frequency: 'Once daily', 
          time: '08:00',
          instructions: 'Take with water in the morning',
          startDate: '2025-01-15',
          refills: 5,
          lastTaken: '2025-08-15 08:30'
        },
        { 
          id: 2, 
          name: 'Metformin', 
          dosage: '500mg', 
          frequency: 'Twice daily', 
          time: '08:00, 20:00',
          instructions: 'Take with meals',
          startDate: '2025-01-15',
          refills: 3,
          lastTaken: '2025-08-15 08:15'
        },
        { 
          id: 3, 
          name: 'Atorvastatin', 
          dosage: '20mg', 
          frequency: 'Once daily', 
          time: '20:00',
          instructions: 'Take in the evening',
          startDate: '2025-02-01',
          refills: 2,
          lastTaken: '2025-08-14 20:15'
        }
      ],
      recentVideos: [
        { id: 1, date: '2025-08-15', medication: 'Lisinopril 10mg', status: 'approved', time: '08:30' },
        { id: 2, date: '2025-08-15', medication: 'Metformin 500mg', status: 'pending', time: '08:15' },
        { id: 3, date: '2025-08-14', medication: 'All medications', status: 'approved', time: '20:30' }
      ],
      sideEffects: [
        { id: 1, medication: 'Lisinopril', severity: 'mild', description: 'Occasional dry cough', date: '2025-08-10' }
      ],
      vitals: {
        bloodPressure: '125/78',
        heartRate: '72',
        weight: '180 lbs',
        lastUpdated: '2025-08-15'
      }
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@email.com',
      phone: '(555) 987-6543',
      dateOfBirth: '1978-07-22',
      address: '456 Oak Ave, Grand Rapids, MI 49504',
      emergencyContact: 'Bob Smith - (555) 987-6544',
      lastActive: '2025-08-14',
      adherenceRate: 92,
      status: 'active',
      riskLevel: 'low',
      nextAppointment: '2025-08-25',
      totalMedications: 2,
      completedVideos: 45,
      missedDoses: 1,
      medications: [
        { 
          id: 4, 
          name: 'Atorvastatin', 
          dosage: '20mg', 
          frequency: 'Once daily', 
          time: '20:00',
          instructions: 'Take with dinner',
          startDate: '2024-12-01',
          refills: 4,
          lastTaken: '2025-08-14 20:00'
        },
        { 
          id: 5, 
          name: 'Vitamin D3', 
          dosage: '1000IU', 
          frequency: 'Once daily', 
          time: '08:00',
          instructions: 'Take with breakfast',
          startDate: '2025-01-01',
          refills: 11,
          lastTaken: '2025-08-14 08:10'
        }
      ],
      recentVideos: [
        { id: 4, date: '2025-08-14', medication: 'All medications', status: 'approved', time: '20:05' },
        { id: 5, date: '2025-08-13', medication: 'Atorvastatin 20mg', status: 'approved', time: '20:12' }
      ],
      sideEffects: [],
      vitals: {
        bloodPressure: '118/75',
        heartRate: '68',
        weight: '145 lbs',
        lastUpdated: '2025-08-14'
      }
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.j@email.com',
      phone: '(555) 456-7890',
      dateOfBirth: '1962-11-30',
      address: '789 Pine Rd, Grand Rapids, MI 49505',
      emergencyContact: 'Sarah Johnson - (555) 456-7891',
      lastActive: '2025-08-12',
      adherenceRate: 68,
      status: 'needs_attention',
      riskLevel: 'high',
      nextAppointment: '2025-08-18',
      totalMedications: 4,
      completedVideos: 15,
      missedDoses: 12,
      medications: [
        { 
          id: 6, 
          name: 'Metoprolol', 
          dosage: '50mg', 
          frequency: 'Twice daily', 
          time: '08:00, 20:00',
          instructions: 'Take with or without food',
          startDate: '2025-03-01',
          refills: 2,
          lastTaken: '2025-08-12 08:00'
        },
        { 
          id: 7, 
          name: 'Warfarin', 
          dosage: '5mg', 
          frequency: 'Once daily', 
          time: '18:00',
          instructions: 'Take at the same time each day',
          startDate: '2025-03-15',
          refills: 1,
          lastTaken: '2025-08-11 18:00'
        }
      ],
      recentVideos: [
        { id: 6, date: '2025-08-12', medication: 'Metoprolol 50mg', status: 'pending', time: '08:00' },
        { id: 7, date: '2025-08-11', medication: 'Warfarin 5mg', status: 'rejected', time: '18:30' }
      ],
      sideEffects: [
        { id: 2, medication: 'Metoprolol', severity: 'moderate', description: 'Fatigue and dizziness', date: '2025-08-08' },
        { id: 3, medication: 'Warfarin', severity: 'mild', description: 'Easy bruising', date: '2025-08-05' }
      ],
      vitals: {
        bloodPressure: '145/95',
        heartRate: '58',
        weight: '195 lbs',
        lastUpdated: '2025-08-12'
      }
    }
  ]);

  const [pendingVideos] = useState([
    {
      id: 1,
      patientId: 1,
      patientName: 'John Doe',
      medication: 'Metformin 500mg',
      recordedAt: '2025-08-15 08:15',
      status: 'pending',
      duration: '45 seconds',
      quality: 'HD'
    },
    {
      id: 2,
      patientId: 3,
      patientName: 'Mike Johnson',
      medication: 'Metoprolol 50mg',
      recordedAt: '2025-08-12 08:00',
      status: 'pending',
      duration: '32 seconds',
      quality: 'SD'
    }
  ]);

  // Statistics
  const stats = {
    totalPatients: patients.length,
    activePatients: patients.filter(p => p.status === 'active').length,
    pendingReviews: pendingVideos.length,
    avgAdherence: Math.round(patients.reduce((sum, p) => sum + p.adherenceRate, 0) / patients.length),
    highRiskPatients: patients.filter(p => p.riskLevel === 'high').length,
    totalVideosToday: 8,
    medicationsManaged: patients.reduce((sum, p) => sum + p.totalMedications, 0)
  };

  // Event Handlers
  const handleAddPatient = () => {
    if (!newPatient.firstName || !newPatient.lastName || !newPatient.email) {
      alert('Please fill in required fields (First Name, Last Name, Email)');
      return;
    }

    const patient = {
      id: Date.now(),
      ...newPatient,
      lastActive: new Date().toISOString().split('T')[0],
      adherenceRate: 0,
      status: 'active',
      riskLevel: 'low',
      totalMedications: 0,
      completedVideos: 0,
      missedDoses: 0,
      medications: [],
      recentVideos: [],
      sideEffects: [],
      vitals: {
        bloodPressure: '',
        heartRate: '',
        weight: '',
        lastUpdated: ''
      }
    };

    setPatients(prev => [...prev, patient]);
    setNewPatient({
      firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '',
      address: '', emergencyContact: '', medicalHistory: ''
    });
    setShowAddPatientModal(false);
    alert('Patient added successfully!');
  };

  const handleAddMedication = () => {
    if (!selectedPatient || !newMedication.name || !newMedication.dosage) {
      alert('Please fill in required fields');
      return;
    }

    const medication = {
      id: Date.now(),
      ...newMedication,
      lastTaken: null
    };

    setPatients(prev => prev.map(patient => 
      patient.id === selectedPatient 
        ? { 
            ...patient, 
            medications: [...patient.medications, medication],
            totalMedications: patient.totalMedications + 1
          }
        : patient
    ));

    setNewMedication({
      name: '', dosage: '', frequency: '', time: '', instructions: '',
      startDate: '', endDate: '', refills: ''
    });
    setShowAddMedicationModal(false);
    setSelectedPatient(null);
    alert('Medication added successfully!');
  };

  const handleApproveVideo = (videoId, patientId) => {
    // Update patient's recent videos
    setPatients(prev => prev.map(patient => 
      patient.id === patientId 
        ? { 
            ...patient,
            recentVideos: patient.recentVideos.map(video => 
              video.id === videoId ? { ...video, status: 'approved' } : video
            ),
            adherenceRate: Math.min(100, patient.adherenceRate + 2)
          }
        : patient
    ));
    alert('Video approved successfully!');
  };

  const handleRejectVideo = (videoId, patientId) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      setPatients(prev => prev.map(patient => 
        patient.id === patientId 
          ? { 
              ...patient,
              recentVideos: patient.recentVideos.map(video => 
                video.id === videoId ? { ...video, status: 'rejected', rejectionReason: reason } : video
              )
            }
          : patient
      ));
      alert(`Video rejected. Patient will be notified: ${reason}`);
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' || 
      (filterStatus === 'active' && patient.status === 'active') ||
      (filterStatus === 'needs_attention' && patient.status === 'needs_attention') ||
      (filterStatus === 'high_risk' && patient.riskLevel === 'high');

    return matchesSearch && matchesFilter;
  });

  // Component Sections
  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Total Patients</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{stats.totalPatients}</div>
          <div className="text-sm text-green-600">+2 this month</div>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Active Patients</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{stats.activePatients}</div>
          <div className="text-sm text-gray-500">{Math.round((stats.activePatients / stats.totalPatients) * 100)}% of total</div>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Video className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">Pending Reviews</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{stats.pendingReviews}</div>
          <div className="text-sm text-yellow-600">Needs attention</div>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Avg Adherence</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{stats.avgAdherence}%</div>
          <div className="text-sm text-green-600">+3% this week</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowAddPatientModal(true)}
            className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 flex items-center gap-3"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Patient</span>
          </button>
          
          <button
            onClick={() => setActiveTab('videos')}
            className="bg-yellow-600 text-white p-4 rounded-lg hover:bg-yellow-700 flex items-center gap-3"
          >
            <Video className="w-5 h-5" />
            <span>Review Videos ({stats.pendingReviews})</span>
          </button>
          
          <button
            onClick={() => setActiveTab('reports')}
            className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 flex items-center gap-3"
          >
            <FileText className="w-5 h-5" />
            <span>Generate Reports</span>
          </button>
        </div>
      </div>

      {/* High Risk Patients Alert */}
      {stats.highRiskPatients > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-red-900">High Risk Patients</span>
          </div>
          <p className="text-red-800 text-sm">
            {stats.highRiskPatients} patient(s) require immediate attention due to low adherence rates or missed appointments.
          </p>
          <button
            onClick={() => {
              setFilterStatus('high_risk');
              setActiveTab('patients');
            }}
            className="mt-2 text-red-600 hover:text-red-800 underline text-sm"
          >
            View High Risk Patients →
          </button>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <Check className="w-5 h-5 text-green-600" />
            <div>
              <span className="font-medium">John Doe</span> completed medication video
              <span className="text-sm text-gray-500 ml-2">2 hours ago</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
            <Clock className="w-5 h-5 text-yellow-600" />
            <div>
              <span className="font-medium">Mike Johnson</span> missed evening medication
              <span className="text-sm text-gray-500 ml-2">3 hours ago</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Bell className="w-5 h-5 text-blue-600" />
            <div>
              <span className="font-medium">Jane Smith</span> reported side effect
              <span className="text-sm text-gray-500 ml-2">5 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PatientsTab = () => (
    <div className="space-y-4">
      {/* Patient Search and Filters */}
      <div className="bg-white border rounded-lg p-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search patients by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Patients</option>
            <option value="active">Active</option>
            <option value="needs_attention">Needs Attention</option>
            <option value="high_risk">High Risk</option>
          </select>
          
          <button
            onClick={() => setShowAddPatientModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Patient
          </button>
        </div>
      </div>

      {/* Patients List */}
      {filteredPatients.map(patient => (
        <div key={patient.id} className="bg-white border rounded-lg">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <button
                    onClick={() => setExpandedPatient(expandedPatient === patient.id ? null : patient.id)}
                    className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded"
                  >
                    {expandedPatient === patient.id ? 
                      <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    }
                    <h3 className="text-lg font-semibold text-gray-800">
                      {patient.firstName} {patient.lastName}
                    </h3>
                  </button>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    patient.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {patient.status === 'active' ? 'Active' : 'Needs Attention'}
                  </span>
                  
                  {patient.riskLevel === 'high' && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      High Risk
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Last active: {patient.lastActive}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Next appt: {patient.nextAppointment}</span>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{patient.adherenceRate}%</div>
                    <div className="text-xs text-blue-800">Adherence</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{patient.totalMedications}</div>
                    <div className="text-xs text-green-800">Medications</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{patient.completedVideos}</div>
                    <div className="text-xs text-purple-800">Videos</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">{patient.missedDoses}</div>
                    <div className="text-xs text-orange-800">Missed</div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedPatient(patient.id);
                    setShowAddMedicationModal(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Medication
                </button>
                
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
            
            {/* Expanded Patient Details */}
            {expandedPatient === patient.id && (
              <div className="border-t pt-6 space-y-6">
                {/* Patient Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Patient Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>DOB:</strong> {patient.dateOfBirth}</div>
                      <div><strong>Address:</strong> {patient.address}</div>
                      <div><strong>Emergency Contact:</strong> {patient.emergencyContact}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Latest Vitals</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Blood Pressure:</strong> {patient.vitals.bloodPressure}</div>
                      <div><strong>Heart Rate:</strong> {patient.vitals.heartRate} bpm</div>
                      <div><strong>Weight:</strong> {patient.vitals.weight}</div>
                      <div><strong>Last Updated:</strong> {patient.vitals.lastUpdated}</div>
                    </div>
                  </div>
                </div>

                {/* Current Medications */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Current Medications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {patient.medications.map(medication => (
                      <div key={medication.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-gray-800">
                            {medication.name} {medication.dosage}
                          </div>
                          <div className="flex gap-1">
                            <button className="text-blue-600 hover:text-blue-800 p-1">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800 p-1">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div><strong>Frequency:</strong> {medication.frequency}</div>
                          <div><strong>Time:</strong> {medication.time}</div>
                          <div><strong>Instructions:</strong> {medication.instructions}</div>
                          <div><strong>Refills:</strong> {medication.refills} remaining</div>
                          {medication.lastTaken && (
                            <div><strong>Last Taken:</strong> {medication.lastTaken}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Videos */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Recent Videos</h4>
                  <div className="space-y-2">
                    {patient.recentVideos.map(video => (
                      <div key={video.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Video className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="font-medium text-gray-800">{video.medication}</div>
                            <div className="text-sm text-gray-600">{video.date} at {video.time}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            video.status === 'approved' ? 'bg-green-100 text-green-800' :
                            video.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {video.status}
                          </span>
                          {video.status === 'pending' && (
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleApproveVideo(video.id, patient.id)}
                                className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleRejectVideo(video.id, patient.id)}
                                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Side Effects */}
                {patient.sideEffects.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Reported Side Effects</h4>
                    <div className="space-y-2">
                      {patient.sideEffects.map(effect => (
                        <div key={effect.id} className="p-3 border rounded-lg bg-orange-50">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-medium text-gray-800">{effect.medication}</div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              effect.severity === 'mild' ? 'bg-yellow-100 text-yellow-800' :
                              effect.severity === 'moderate' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {effect.severity}
                            </span>
                          </div>
                          <div className="text-sm text-gray-700">{effect.description}</div>
                          <div className="text-xs text-gray-500 mt-1">Reported: {effect.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      {filteredPatients.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No patients found matching your criteria</p>
        </div>
      )}
    </div>
  );

  const VideosTab = () => (
    <div className="space-y-4">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Video Reviews</h3>
        {pendingVideos.map(video => (
          <div key={video.id} className="border rounded-lg p-4 mb-3 bg-yellow-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Video className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-800">{video.patientName}</h4>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    Pending Review
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                  <div><strong>Medication:</strong> {video.medication}</div>
                  <div><strong>Recorded:</strong> {video.recordedAt}</div>
                  <div><strong>Duration:</strong> {video.duration}</div>
                  <div><strong>Quality:</strong> {video.quality}</div>
                </div>

                {/* Video Player Placeholder */}
                <div className="bg-gray-900 rounded-lg h-48 flex items-center justify-center mb-4">
                  <div className="text-center text-white">
                    <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm opacity-75">Video Player</p>
                    <p className="text-xs opacity-50">Click to play {video.patientName}'s medication video</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => handleApproveVideo(video.id, video.patientId)}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Approve
              </button>
              <button
                onClick={() => handleRejectVideo(video.id, video.patientId)}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Reject
              </button>
              <button className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
        
        {pendingVideos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Video className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No pending video reviews</p>
            <p className="text-sm">All videos have been reviewed</p>
          </div>
        )}
      </div>
    </div>
  );

  const ReportsTab = () => (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Generate Reports</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Patient Adherence Report</h4>
            <p className="text-sm text-gray-600 mb-4">Comprehensive adherence statistics for all patients</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              Generate Report
            </button>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Side Effects Summary</h4>
            <p className="text-sm text-gray-600 mb-4">Summary of all reported side effects by medication</p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              Generate Report
            </button>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Video Compliance Report</h4>
            <p className="text-sm text-gray-600 mb-4">Video submission and approval rates</p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              Generate Report
            </button>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Monthly Summary</h4>
            <p className="text-sm text-gray-600 mb-4">Complete monthly overview for all patients</p>
            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.totalVideosToday}</div>
            <div className="text-sm text-blue-800">Videos Today</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.medicationsManaged}</div>
            <div className="text-sm text-green-800">Total Medications</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{stats.highRiskPatients}</div>
            <div className="text-sm text-orange-800">High Risk Patients</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">98%</div>
            <div className="text-sm text-purple-800">HIPAA Compliance</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Provider Dashboard</h1>
                <p className="text-sm text-gray-600">
                  Welcome back, {user?.name || 'Dr. Smith'} • {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-600" />
                <span>HIPAA Compliant</span>
              </div>
              <button
                onClick={() => onNavigate('settings')}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-6 border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'patients', label: 'Patients', icon: Users, count: stats.totalPatients },
            { id: 'videos', label: 'Video Reviews', icon: Video, count: stats.pendingReviews },
            { id: 'reports', label: 'Reports', icon: FileText }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    tab.count > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'patients' && <PatientsTab />}
        {activeTab === 'videos' && <VideosTab />}
        {activeTab === 'reports' && <ReportsTab />}
      </div>

      {/* Add Patient Modal */}
      {showAddPatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Patient</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  value={newPatient.firstName}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  value={newPatient.lastName}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                value={newPatient.dateOfBirth}
                onChange={(e) => setNewPatient(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={newPatient.address}
                onChange={(e) => setNewPatient(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
              <input
                type="text"
                value={newPatient.emergencyContact}
                onChange={(e) => setNewPatient(prev => ({ ...prev, emergencyContact: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Name and phone number"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
              <textarea
                value={newPatient.medicalHistory}
                onChange={(e) => setNewPatient(prev => ({ ...prev, medicalHistory: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Brief medical history and relevant conditions..."
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleAddPatient}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium"
              >
                Add Patient
              </button>
              <button
                onClick={() => {
                  setShowAddPatientModal(false);
                  setNewPatient({
                    firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '',
                    address: '', emergencyContact: '', medicalHistory: ''
                  });
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Medication Modal */}
      {showAddMedicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Medication</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name *</label>
                <input
                  type="text"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Lisinopril"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dosage *</label>
                <input
                  type="text"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 10mg"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <select
                    value={newMedication.frequency}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, frequency: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select frequency</option>
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="Four times daily">Four times daily</option>
                    <option value="As needed">As needed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Refills</label>
                  <input
                    type="number"
                    value={newMedication.refills}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, refills: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time(s)</label>
                <input
                  type="text"
                  value={newMedication.time}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 08:00 or 08:00, 20:00"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newMedication.startDate}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={newMedication.endDate}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                <textarea
                  value={newMedication.instructions}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, instructions: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Special instructions for taking this medication..."
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddMedication}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium"
              >
                Add Medication
              </button>
              <button
                onClick={() => {
                  setShowAddMedicationModal(false);
                  setNewMedication({
                    name: '', dosage: '', frequency: '', time: '', instructions: '',
                    startDate: '', endDate: '', refills: ''
                  });
                  setSelectedPatient(null);
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;