'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { signinSteps } from '../_data/formInputsData';
import SideImage from '../_components/SideImage';
import ProgressNumbers from '../_components/ProgressNumbers';
import FormContent from '../_components/FormContent';
import SignLink from '../_components/SignLink';
import { signinSchema } from '@/lib/schemas/user';
import { CircleX } from 'lucide-react';
import useLocalStorageManager from '@/hooks/useLocalStorageManager';

export interface SigninData {
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const { setItem } = useLocalStorageManager();

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentStep])

  const handleInputChange = (value: string) => {
    const currentField = signinSteps[currentStep].field;
    setFormData(prev => ({
      ...prev,
      [currentField]: value
    }));
  };

  const handleNext = async () => {
    const currentField = signinSteps[currentStep].field;
    const currentValue = formData[currentField];

    setErrors([])
    
    if (!currentValue.trim()) {
      setErrors(['This field is required']);
      return;
    }

    const parsedInputs = signinSchema.safeParse(formData)

    if (!parsedInputs.success) {
      const fieldIssues = parsedInputs.error.issues.filter(issue => issue.path[0] === currentField);
      if (fieldIssues.length > 0) {
        setErrors(fieldIssues.map(({message}) => (message)));
        return;
      }
    }

    if (currentStep < signinSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Last step - submit form
      setIsLoading(true);
      
      try {
      const result = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!result.ok) {
        setErrors(["Email or Password is incorrect, try again"])
        return
      }

      const body = await result.json();

      setItem("accessToken", body.data.accessToken);
      setItem("expiresIn", body.data.expiresIn);

      // Redirect to dashboard
      router.push('/home');
      
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

  const currentField = signinSteps[currentStep].field;
  const currentValue = formData[currentField];
  const isLastStep = currentStep === signinSteps.length - 1;

  return (
    <div className="min-h-screen flex">
      {/* Left side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-4">
          {/* Progress bar */}
          <ProgressNumbers currentStep={currentStep} nbrOfSteps={2}/>

          {/* Form content */}
          <FormContent signupSteps={signinSteps} currentStep={currentStep}/>

          {/* Inputs */}
          <div className="space-y-6">
            {/* Input field with animation */}
            <div className="relative">
              <input
                ref={inputRef}
                type={signinSteps[currentStep].type}
                value={currentValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={signinSteps[currentStep].placeholder}
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
                    isLastStep ? 'Login' : 'Next'
                  )}
                  wfull='w-full'
                  disabled={!currentValue.trim() || isLoading}
                />
              </div>
            </div>
          </div>

          {!!errors.length && <div className="mt-10 py-4 px-8 bg-red-700 dark:bg-red-700 rounded-2xl text-black">
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
          </div>}

          {/* Sign in link */}
          <SignLink currentStep={currentStep} title="You don't have an account?" link='/signup'/>
        </div>
      </div>

      {/* Right side - Image */}
      <SideImage />

    </div>
  );
};

export default SignupPage;