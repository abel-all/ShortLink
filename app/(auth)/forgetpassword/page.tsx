'use client'

import Button from '@/components/Button'
import { ChevronLeft, CircleX, Dot, MailCheck, RotateCcwKey } from 'lucide-react'
import Link from 'next/link'
import React, { useRef, useState } from 'react'

const page = () => {

    const [formData, setFormData] = useState<{email: string}>({
      email: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [emailIsSent, setEmailIsSent] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const handleInputChange = (value: string) => {
      setFormData(prev => ({
        email: value
      }));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleNext();
      }
    };

    const handleNext = async () => {

      setErrors([])
      
      if (!formData.email.trim()) {
        setErrors(['This field is required']);
        return;
      }

      setIsLoading(true);
      
      try {
        const result = await fetch("http://localhost:8080/api/v1/auth/forget-password", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
      
        const body = await result.json();

        if (body.message !== "OK") {
            setErrors(Object.values(body.errors))
            return
        }      
        // Redirect to dashboard
        setEmailIsSent(true);
        
      } catch (error) {
        setErrors(['Network error — try again']);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className='min-h-screen w-full flex justify-center items-center'>
        <div className='max-w-md w-full flex flex-col items-center gap-6'>

            {!emailIsSent ? 
            <>
            <RotateCcwKey size={160} strokeWidth={1} className='opacity-90'/>

            <div className='text-center space-y-1 mb-6'>
                <div className='text-4xl font-semibold'>
                    Forget your password?
                </div>
                <div className='text-lg font-base opacity-70'>
                    Enter your email for send you password reset link
                </div>
            </div>

            {/* Inputs */}
            <div className="w-full space-y-6">
              {/* Input field with animation */}
              <div className="relative">
                <input
                  type="email"
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter your email"
                  className="w-full px-6 border border-gray-300 rounded-full h-12 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  autoFocus
                />
              </div>

              {/* Navigation buttons */}
              <div className="w-full" onClick={handleNext} >
                <Button 
                  title={isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send email'
                  )}
                  wfull='w-full'
                  disabled={isLoading}
                />
              </div>

              {/* Errors */}
              {!!errors.length && <div className="mt-10 py-4 px-8 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-800 rounded-2xl">
                <div className="flex gap-2 items-center mb-4">
                  <CircleX className='text-red-600 dark:text-red-400'/>
                  <div className='text-base font-bold text-red-800 dark:text-red-300'>
                    Error
                  </div>
                </div>
                <div className="text-base font-normal text-red-800 dark:text-red-300">
                  {errors.map((error, index) => (
                    <div key={index} className='flex items-center gap-1'>
                      <Dot />
                      <div>
                        {error}
                      </div>
                    </div>
                  ))}
                </div>
              </div>}

            </div>

            {/* back to login */}
            <Link href={"/signin"} className='hover:underline flex gap-3 items-center justify-center'>
                <ChevronLeft />
                Back to login
            </Link>
            </> : 
            <div className='flex flex-col items-center gap-6'>
                <MailCheck size={160} strokeWidth={1} className='opacity-90'/>
                <div className='text-center space-y-1 mb-6'>
                    <div className='text-4xl font-semibold'>
                        Email is sent successfuly
                    </div>
                    <div className='text-lg font-base opacity-70'>
                        Check your email for password reset link
                    </div>
                </div>
            </div>}
        </div>
      </div>
)}

export default page