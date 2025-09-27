'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';

interface SigninData {
  email: string;
  password: string;
}

const SignupPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SigninData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    {
      field: 'email' as keyof SigninData,
      placeholder: 'Enter your email address',
      type: 'email',
      title: 'Your email address',
      subtitle: 'Enter the email you used to create your account'
    },
    {
      field: 'password' as keyof SigninData,
      placeholder: 'Enter your password',
      type: 'password',
      title: 'Enter your password',
      subtitle: 'Enter your account password to continue'
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
      {/* Left side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-4">
          {/* Progress bar */}
          <div className="mb-8 flex items-center justify-center relative">
          {Array.from({ length: 2 }, (_, index) => (
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
                {index < 2 - 1 && (
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
                      <span>Validating...</span>
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

          {/* Sign in link */}
          {currentStep === 0 && <div className="text-base font-medium mt-8 px-2 opacity-80">
            You don't have an account?{' '}
            <a href="/signup" className="text-[var(--second-color)] hover:text-[var(--main-color)] transition-all duration-300">
              Sign up
            </a>
          </div>}
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image 
          src="/authSideImg.png"
          alt='auth side image for shortly'
          fill
          sizes='100vw'
          className='object-cover'
        />
      </div>

    </div>
  );
};

export default SignupPage;