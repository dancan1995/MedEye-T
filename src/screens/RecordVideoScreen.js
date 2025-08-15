// RecordVideoScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { Video, Square, RotateCcw, Send, ArrowLeft, Clock, Pill, Check } from 'lucide-react';

const RecordVideoScreen = ({ onNavigate, user, selectedMedications = [] }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [stream, setStream] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState('setup'); // setup, recording, review, uploading
  
  const videoRef = useRef(null);
  const recordedVideoRef = useRef(null);
  const timerRef = useRef(null);

  // Sample medications for demo
  const medications = [
    { id: 1, name: 'Lisinopril 10mg', dosage: '1 tablet', time: '08:00 AM' },
    { id: 2, name: 'Metformin 500mg', dosage: '1 tablet', time: '08:00 AM' }
  ];

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: true
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCurrentStep('recording');
    } catch (error) {
      alert('Error accessing camera: ' + error.message);
    }
  };

  const startRecording = () => {
    if (!stream) return;
    
    try {
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        setRecordedVideo(videoUrl);
        setCurrentStep('review');
      };
      
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      alert('Error starting recording: ' + error.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
  };

  const retakeVideo = () => {
    setRecordedVideo(null);
    setRecordingTime(0);
    setCurrentStep('setup');
  };

  const sendVideo = async () => {
    setIsUploading(true);
    setCurrentStep('uploading');
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Navigate to congratulations screen
      onNavigate('congratulations');
      
    } catch (error) {
      alert('Error uploading video: ' + error.message);
      setIsUploading(false);
      setCurrentStep('review');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const SetupScreen = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="mb-6">
          <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-4">
            <Video className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Record Your Medication Video</h2>
          <p className="text-gray-600">
            You'll record yourself taking your medications. This helps your healthcare provider 
            verify your medication adherence.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-3">Medications to Record:</h3>
          <div className="space-y-2">
            {medications.map(med => (
              <div key={med.id} className="flex items-center gap-3 bg-white p-3 rounded-lg">
                <Pill className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium text-gray-800">{med.name}</div>
                  <div className="text-sm text-gray-600">{med.dosage} at {med.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-900 mb-2">Recording Instructions:</h3>
          <ul className="text-sm text-yellow-800 text-left space-y-1">
            <li>• Show each medication bottle/package clearly to the camera</li>
            <li>• Take your medication as prescribed</li>
            <li>• Speak clearly and state what medication you're taking</li>
            <li>• Ensure good lighting and clear video quality</li>
            <li>• The recording should be 30 seconds to 2 minutes long</li>
          </ul>
        </div>

        <button
          onClick={startCamera}
          className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
        >
          <Video className="w-5 h-5" />
          Start Camera
        </button>
      </div>
    </div>
  );

  const RecordingScreen = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Recording Your Medication Video</h2>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatTime(recordingTime)}</span>
            </div>
            {isRecording && (
              <div className="flex items-center gap-1 text-red-600">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                <span>Recording</span>
              </div>
            )}
          </div>
        </div>

        <div className="relative mb-6">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full rounded-lg bg-gray-900"
            style={{ aspectRatio: '16/9' }}
          />
          
          {!isRecording && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
              <button
                onClick={startRecording}
                className="bg-red-600 text-white p-4 rounded-full hover:bg-red-700 transition-colors"
              >
                <Video className="w-8 h-8" />
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4">
          {isRecording ? (
            <button
              onClick={stopRecording}
              className="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Square className="w-5 h-5" />
              Stop Recording
            </button>
          ) : (
            <button
              onClick={startRecording}
              className="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Video className="w-5 h-5" />
              Start Recording
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const ReviewScreen = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Review Your Video</h2>
          <p className="text-gray-600">
            Please review your recording before sending it to your healthcare provider.
          </p>
        </div>

        <div className="mb-6">
          <video
            ref={recordedVideoRef}
            src={recordedVideo}
            controls
            className="w-full rounded-lg"
            style={{ aspectRatio: '16/9' }}
          />
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-900">Ready to Send</span>
          </div>
          <p className="text-green-800 text-sm">
            Your video will be securely sent to your healthcare provider for review.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={sendVideo}
            disabled={isUploading}
            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Send Video
          </button>
          
          <button
            onClick={retakeVideo}
            disabled={isUploading}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Retake
          </button>
        </div>
      </div>
    </div>
  );

  const UploadingScreen = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="mb-6">
          <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-4">
            <Send className="w-12 h-12 text-blue-600 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Uploading Your Video</h2>
          <p className="text-gray-600">
            Please wait while we securely upload your medication video...
          </p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-blue-600 h-2 rounded-full w-2/3 animate-pulse"></div>
        </div>

        <p className="text-sm text-gray-500">
          This may take a few moments. Please don't close this window.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('medicines')}
              disabled={isRecording || isUploading}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg disabled:opacity-50"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div>
              <h1 className="text-xl font-bold text-gray-800">Medication Video Recording</h1>
              <p className="text-sm text-gray-600">Step 2 of 2</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="py-8 px-4">
        {currentStep === 'setup' && <SetupScreen />}
        {currentStep === 'recording' && <RecordingScreen />}
        {currentStep === 'review' && <ReviewScreen />}
        {currentStep === 'uploading' && <UploadingScreen />}
      </div>
    </div>
  );
};

export default RecordVideoScreen;