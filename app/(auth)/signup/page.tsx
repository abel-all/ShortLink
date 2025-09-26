'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignupPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SignupData>({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    {
      field: 'firstName' as keyof SignupData,
      placeholder: 'Enter your first name',
      type: 'text',
      title: 'What\'s your first name?',
      subtitle: 'Let\'s start with the basics'
    },
    {
      field: 'lastName' as keyof SignupData,
      placeholder: 'Enter your last name',
      type: 'text',
      title: 'And your last name?',
      subtitle: 'Almost there...'
    },
    {
      field: 'email' as keyof SignupData,
      placeholder: 'Enter your email address',
      type: 'email',
      title: 'Your email address',
      subtitle: 'We\'ll use this to keep you updated'
    },
    {
      field: 'password' as keyof SignupData,
      placeholder: 'Create a secure password',
      type: 'password',
      title: 'Create a password',
      subtitle: 'Make it strong and memorable'
    }
  ];

  const handleInputChange = (value: string) => {
    const currentField = steps[currentStep].field;
    setFormData(prev => ({
      ...prev,
      [currentField]: value
    }));
  };

  const handleNext = async () => {
    const currentField = steps[currentStep].field;
    const currentValue = formData[currentField];

    if (!currentValue.trim()) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Last step - submit form
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to dashboard
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  const currentField = steps[currentStep].field;
  const currentValue = formData[currentField];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image (hidden on medium and smaller screens) */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="absolute inset-0 bg-black bg-opacity-20" />
          <div className="relative h-full flex items-center justify-center p-12">
            <div className="text-white text-center">
              <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
              <p className="text-xl opacity-90">Join thousands of users who trust us with their journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Form content */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep].subtitle}
            </p>
          </div>

          <div className="space-y-6">
            {/* Input field with animation */}
            <div className="relative">
              <input
                type={steps[currentStep].type}
                value={currentValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={steps[currentStep].placeholder}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                autoFocus
              />
            </div>

            {/* Navigation buttons */}
            <div className="flex space-x-4">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="flex-1 py-4 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!currentValue.trim() || isLoading}
                className="flex-1 py-4 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  isLastStep ? 'Create Account' : 'Next'
                )}
              </button>
            </div>
          </div>

          {/* Form preview */}
          {currentStep > 0 && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Your information:</h3>
              <div className="space-y-1 text-sm text-gray-600">
                {formData.firstName && <p>First Name: {formData.firstName}</p>}
                {formData.lastName && <p>Last Name: {formData.lastName}</p>}
                {formData.email && <p>Email: {formData.email}</p>}
                {formData.password && <p>Password: {'•'.repeat(formData.password.length)}</p>}
              </div>
            </div>
          )}

          {/* Sign in link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/signin" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;