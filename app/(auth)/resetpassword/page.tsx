'use client'

import Button from '@/components/Button'
import { CircleX, Dot, Lock, RotateCcwKey, TicketCheck, UserRoundCheck } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useRef, useState } from 'react'

const page = () => {

    const searchParams = useSearchParams();

    const [formData, setFormData] = useState<{password: string}>({
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isPassReseted, setIsPassReseted] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const router = useRouter();

    const handleInputChange = (value: string) => {
      setFormData(prev => ({
        ...prev,
        password: value
      }));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleNext();
      }
    };

    const handleNext = async () => {

      const token = searchParams.get('token');

      setErrors([])

      console.log("token is : ", token)
      
      if (!formData.password.trim()) {
        setErrors(['This field is required']);
        return;
      }

      setIsLoading(true);
      
      try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: token,
                password: formData.password,
            }),
        });
      
        const body = await result.json();

        if (body.message !== "OK") {
            setErrors(Object.values(body.errors))
            return
        }     
        
        setIsPassReseted(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        // Redirect to Signin
        router.push('/signin');
        
      } catch (error) {
        setErrors(['Network error — try again']);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className='min-h-screen w-full flex justify-center items-center'>
        <div className='max-w-md w-full flex flex-col items-center gap-6'>

            <TicketCheck size={160} strokeWidth={1} className='opacity-90'/>

            <div className='text-center space-y-1 mb-6'>
                <div className='text-4xl font-semibold'>
                    Reset password
                </div>
                <div className='text-lg font-base opacity-70'>
                    Please kindly set your new password
                </div>
            </div>

            {/* Inputs */}
            <div className="w-full space-y-6">
              {/* Input field with animation */}
              <div className="relative">
                <input
                  ref={inputRef}
                  type="password"
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter your password"
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
                      <span>Reseting...</span>
                    </div>
                  ) : (
                    'Reset password'
                  )}
                  wfull='w-full'
                  disabled={isLoading}
                />
              </div>

              {/* Success or Errors */}
              {isPassReseted ? <div className="mt-10 py-4 px-8 bg-green-50 border border-green-200 rounded-2xl">
                  <div className="flex gap-2 items-center mb-4">
                    <Lock className='text-green-600'/>
                    <div className='text-base font-bold text-green-800'>
                      Success
                    </div>
                  </div>
              
                  <div className="text-base font-normal text-green-800">
                      <div className='flex items-center gap-1'>
                        <Dot />
                        <div>Your password has been reseted successfuly.</div>
                      </div>
                  </div>
                </div> :
              !!errors.length && <div className="mt-10 py-4 px-8 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-800 rounded-2xl">
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
        </div>
      </div>
)}

export default page