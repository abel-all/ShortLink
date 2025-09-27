'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';
import { Clock6 } from 'lucide-react';

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
      router.push('/signin');
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
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image 
          src="/authSideImg.png"
          alt='auth side image for shortly'
          fill
          sizes='100vw'
          className='object-cover'
        />
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-4">
          {/* Progress bar */}
          <div className="mb-8 flex items-center justify-between relative">
          {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="flex items-center w-full">
                {/* Step circle */}
                <div 
                  className={`transition-all duration-500 ease-out flex-shrink-0 w-14 h-14 rounded-full border-2 flex items-center justify-center font-medium text-2xl ${
                    index < currentStep 
                      ? "border-green-600 text-black dark:text-white"
                      : "border-[var(--border-color-white)] text-black dark:text-white"
                  }`}
                >
                  {index + 1}
                </div>
                {index < 4 - 1 && (
                  <div 
                    className={`flex-1 h-0.5 transition-all duration-500 ease-out ${
                      index < currentStep 
                        ? "bg-green-600"
                        : "bg-[var(--border-color-white)] dark:[var(--border-color-dark)]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form content */}
          <div className="space-y-2">
            <div className="text-5xl font-medium">
              {steps[currentStep].title}
            </div>
            <div className="text-xl font-normal">
              {steps[currentStep].subtitle}
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-6">
            {/* Input field with animation */}
            <div className="relative">
              <input
                type={steps[currentStep].type}
                value={currentValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={steps[currentStep].placeholder}
                className="w-full px-6 border border-gray-300 rounded-full h-12 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                autoFocus
              />
            </div>

            {/* Navigation buttons */}
            <div className="flex space-x-4">
              {currentStep > 0 && (
                <div className="w-full" onClick={handleBack}>
                  <Button title='Back' wfull='w-full' version='outline'/>
                </div>
              )}
              <div className="w-full" onClick={handleNext} >
                <Button 
                  title={isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating...</span>
                    </div>
                  ) : (
                    isLastStep ? 'Create Account' : 'Next'
                  )}
                  wfull='w-full'
                  disabled={!currentValue.trim() || isLoading}
                />
              </div>
            </div>
          </div>

          {/* Important - input details */}
          <div className="mt-10 py-4 px-8 bg-[var(--third-color)] dark:bg-[var(--third-color-dark)] rounded-2xl text-black">
            <div className="flex gap-2 items-center mb-4">
              <Clock6 />
              <div className='text-base font-bold'>
                Important
              </div>
            </div>
                    
            <div className="text-base font-normal">
              {currentStep === 0 && (
                <div>
                  <span className="font-semibold">First Name:</span> Enter your legal first name as it appears on official documents
                </div>
              )}
              
              {currentStep === 1 && (
                <div>
                  <span className="font-semibold">Last Name:</span> Enter your legal last name/surname as it appears on official documents
                </div>
              )}
              
              {currentStep === 2 && (
                <div>
                  <span className="font-semibold">Email:</span> Provide a valid email address (e.g., user@example.com) - this will be used for account verification
                </div>
              )}
              
              {currentStep === 3 && (
                <div>
                  <span className="font-semibold">Password:</span> Create a secure password with at least 8 characters, including uppercase, lowercase, numbers, and special characters
                </div>
              )}
            </div>
          </div>

          {/* Sign in link */}
          {currentStep === 0 && <div className="text-base font-medium mt-8 px-2 opacity-80">
            Already have an account?{' '}
            <a href="/signin" className="text-[var(--second-color)] hover:text-[var(--main-color)] transition-all duration-300">
              Sign in
            </a>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;