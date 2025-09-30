'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { CircleX, Clock6, UserRoundCheck } from 'lucide-react';
import { signupSteps } from '../_data/formInputsData';
import SideImage from '../_components/SideImage';
import ProgressNumbers from '../_components/ProgressNumbers';
import FormContent from '../_components/FormContent';
import SignLink from '../_components/SignLink';
import { signupSchema } from '@/lib/schemas/user';

export interface SignupData {
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
  const [errors, setErrors] = useState<string[]>([]);
  const [isAccountCreateded, setIsAccountCreateded] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentStep])

  const handleInputChange = (value: string) => {
    const currentField = signupSteps[currentStep].field;
    setFormData(prev => ({
      ...prev,
      [currentField]: value
    }));
  };

  const handleNext = async () => {
    const currentField = signupSteps[currentStep].field;
    const currentValue = formData[currentField];

    setErrors([])

    if (!currentValue.trim()) {
      setErrors(['This field is required']);
      return;
    }

    const parsedInputs = signupSchema.safeParse(formData)

    if (!parsedInputs.success) {
      const fieldIssues = parsedInputs.error.issues.filter(issue => issue.path[0] === currentField);
      if (fieldIssues.length > 0) {
        setErrors(fieldIssues.map(({message}) => (message)));
        return;
      }
    }
  
    if (currentStep < signupSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
    // Last step - submit form
    setIsLoading(true);
    
    try {
      const result = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const body = await result.json();

      if (body.message !== "OK") {
        setErrors(Object.values(body.errors))
        return
      }

      setIsAccountCreateded(true);
  
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Redirect to singIn
      router.push('/signin');
      
    } catch (error) {
      setErrors(['Network error — try again']);
    } finally {
      setIsLoading(false);
    }
    }

  };

  const handleBack = () => {
    setErrors([])
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  const currentField = signupSteps[currentStep].field;
  const currentValue = formData[currentField];
  const isLastStep = currentStep === signupSteps.length - 1;

  return (
    <div className="min-h-screen flex">
      {/* Lift side - Image */}
      <SideImage />

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-4">
          {/* Progress bar */}
          <ProgressNumbers currentStep={currentStep} nbrOfSteps={4}/>

          {/* Form content */}
          <FormContent signupSteps={signupSteps} currentStep={currentStep}/>

          {/* Inputs */}
          <div className="space-y-6">
            {/* Input field with animation */}
            <div className="relative">
              <input
                ref={inputRef}
                type={signupSteps[currentStep].type}
                value={currentValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={signupSteps[currentStep].placeholder}
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

          {/* Important - input details || Errors */}
            {isAccountCreateded ? <div className="mt-10 py-4 px-8 bg-green-700 dark:bg-green-700 rounded-2xl text-black">
              <div className="flex gap-2 items-center mb-4">
                <UserRoundCheck />
                <div className='text-base font-bold'>
                  Success
                </div>
              </div>

              <div className="text-base font-normal">
                  <div>
                    <span className="font-semibold">{'-> '}</span> Your account has been created successfuly.
                  </div>
              </div>
            </div> :
            !!errors.length ? <div className="mt-10 py-4 px-8 bg-red-700 dark:bg-red-700 rounded-2xl text-black">
              <div className="flex gap-2 items-center mb-4">
                <CircleX />
                <div className='text-base font-bold'>
                  Error
                </div>
              </div>

              <div className="text-base font-normal">
                {errors.map((error, index) => (
                  <div key={index}>
                    <span className="font-semibold">{'-> '}</span> {error}
                  </div>
                ))}
              </div>
            </div> :
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
          </div>}

          {/* Sign in link */}
          <SignLink currentStep={currentStep} title="Already have an account?" link='/signin'/>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;