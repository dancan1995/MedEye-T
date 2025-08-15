// TermsAndConditions.js
import React from 'react';
import { ArrowLeft, Shield, FileText, Lock } from 'lucide-react';

const TermsAndConditions = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('signup')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Signup
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Terms and Conditions</h1>
          </div>
          <p className="text-gray-600">Last updated: August 15, 2025</p>
        </div>

        {/* Terms Content */}
        <div className="space-y-8">
          {/* HIPAA Compliance Section */}
          <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-900">HIPAA Compliance Statement</h2>
            </div>
            <p className="text-blue-800 mb-4">
              MedAdhere Pro is committed to protecting your health information in accordance with the Health Insurance 
              Portability and Accountability Act (HIPAA) of 1996.
            </p>
            <ul className="space-y-2 text-blue-800">
              <li>• All personal health information is encrypted both in transit and at rest</li>
              <li>• Access to your data is strictly controlled and limited to authorized personnel</li>
              <li>• We maintain comprehensive audit logs of all data access</li>
              <li>• Your data is never shared without your explicit consent or legal requirement</li>
              <li>• You have the right to request access, correction, or deletion of your health information</li>
            </ul>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By using MedAdhere Pro, you agree to be bound by these Terms and Conditions. If you do not agree 
              to these terms, please do not use our service. These terms may be updated from time to time, and 
              continued use of the service constitutes acceptance of any changes.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Service Description</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              MedAdhere Pro is a medication adherence monitoring platform that allows:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Patients to record video confirmations of medication intake</li>
              <li>• Healthcare providers to review and verify patient medication adherence</li>
              <li>• Automated reminders and adherence tracking</li>
              <li>• Secure communication between patients and providers</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. User Responsibilities</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800">For Patients:</h3>
                <ul className="space-y-1 text-gray-700 ml-4">
                  <li>• Provide accurate medication intake recordings</li>
                  <li>• Follow prescribed medication schedules</li>
                  <li>• Report any adverse effects or concerns to your healthcare provider</li>
                  <li>• Maintain the confidentiality of your account credentials</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">For Healthcare Providers:</h3>
                <ul className="space-y-1 text-gray-700 ml-4">
                  <li>• Review patient videos in a timely manner</li>
                  <li>• Provide appropriate medical guidance and supervision</li>
                  <li>• Maintain patient confidentiality and privacy</li>
                  <li>• Use the platform in accordance with medical best practices</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Privacy and Data Protection */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">4. Privacy and Data Protection</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your personal health information:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• End-to-end encryption for all video recordings and data transmission</li>
              <li>• Multi-factor authentication for account access</li>
              <li>• Regular security audits and vulnerability assessments</li>
              <li>• Automatic session timeouts and secure logout procedures</li>
              <li>• Data minimization - we only collect necessary information</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              MedAdhere Pro is a tool to assist with medication adherence monitoring and does not replace 
              professional medical advice, diagnosis, or treatment. Always seek the advice of your physician 
              or other qualified health provider with any questions you may have regarding a medical condition. 
              Never disregard professional medical advice or delay in seeking it because of something you have 
              read or experienced through this platform.
            </p>
          </section>

          {/* Video Recording Consent */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Video Recording Consent</h2>
            <p className="text-gray-700 leading-relaxed">
              By using the video recording feature, you consent to the recording, storage, and review of your 
              medication intake videos by your designated healthcare provider(s). These recordings are stored 
              securely and are only accessible to authorized medical personnel involved in your care.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              You may terminate your account at any time by contacting our support team. Upon termination, 
              your personal data will be securely deleted in accordance with HIPAA requirements and our 
              data retention policies, unless required to be retained by law.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms and Conditions or our privacy practices, 
              please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">Email: privacy@medadherepro.com</p>
              <p className="text-gray-700">Phone: 1-800-MEDCARE</p>
              <p className="text-gray-700">Address: 123 Healthcare Blvd, Medical City, MC 12345</p>
            </div>
          </section>
        </div>

        {/* Accept Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => onNavigate('signup')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            I Accept These Terms
          </button>
        </div>