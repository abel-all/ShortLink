'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation';
import { CircleX, Dot, LockKeyhole, SearchX } from 'lucide-react';
import Button from '@/components/Button';
import LoaderOntop from '@/components/LoaderOnTop';
import getClientInfo, { DeviceType } from '@/lib/getClientinfo';

interface dataTypes {
    operatingSystem: string,
    deviceType: DeviceType,
    timeZone: string | null,
    password: string,
    ipAddress: string | null,
    referer: string | null,
    trustToken: string
}

const page = () => {

    const [errors, setErrors] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState<dataTypes>({
      operatingSystem: 'Unknown',
      deviceType: 'mobile',
      timeZone: 'Unknown',
      password: 'Unknown',
      ipAddress: '223.240.160.251',
      referer: 'Unknown',
      trustToken: 'Unknown'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const params = useParams();
    
    const fetchUrldata = async (source: string) => {

        const result = await fetch(`http://localhost:8080/api/v1/short-link/url?id=${params.linkId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
      
        const body = await result.json();

        if (body.message !== "OK") {
            if (source === "checkPass") {
                setError("The Url not Found")
            } else {
                setErrors(Object.values(body.errors ?? {error: "Error Try Again"}))
            }
            return
        }      
        // Redirect to link
        window.location.replace(body.data.url);
    }

    useEffect(() => {
      inputRef.current?.focus();
    }, [])

    useEffect(() => {
      const clientData = async () => {
        const data = await getClientInfo();
        setFormData(prev => ({
          ...prev,
          ...data,
        }))
      }

      clientData();
    }, [])

    useEffect(() => {
        if (!params.linkId) return;

        const checkPassword = async () => {
            try {
              const result = await fetch(`http://localhost:8080/api/v1/short-link/has-password?id=${params.linkId}`, {
                method: 'GET',
              });

              const body = await result.json();
    
              if (body.message !== "OK") {
                setError(body.data);
              }

              if (body.data.hasPassword) {
                setError("")
              } else {
                // send req to get url
                fetchUrldata("checkPass")
              }
    
            } catch (error) {
              setErrors(['Network error — try again']);
            } finally {
              setIsFetching(false);
            }
        }

        checkPassword();
    }, [params.linkId])

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
      setErrors([])
      
      if (!formData.password.trim()) {
        setErrors(['This field is required']);
        return;
      }

      setIsLoading(true);
      
      try {
        fetchUrldata("submitPass");
      } catch (error) {
        setErrors(['Network error — try again']);
      } finally {
        setIsLoading(false);
      }
    };

    return <>
        {isFetching ? <LoaderOntop /> : 
    (
      <div className='min-h-screen w-full flex justify-center items-center'>
        <div className='max-w-md w-full flex flex-col items-center gap-6'>

            {!error ? 
            <>
            <LockKeyhole size={160} strokeWidth={1} className='opacity-90'/>

            <div className='text-center space-y-1 mb-6'>
                <div className='text-4xl font-semibold'>
                    Enter the link password
                </div>
                <div className='text-lg font-base opacity-70'>
                    The link has been protected by password
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
                  placeholder="Enter the password"
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
                      <span>Redirecting...</span>
                    </div>
                  ) : (
                    'Redirect'
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
            </> : 
            <div className='flex flex-col items-center gap-6'>
                <SearchX size={160} strokeWidth={1} className='opacity-90'/>
                <div className='text-center space-y-1 mb-6'>
                    <div className='text-4xl font-semibold'>
                        {error}
                    </div>
                    <div className='text-lg font-base opacity-70'>
                        Check your linkId
                    </div>
                </div>
            </div>}
        </div>
      </div>
    )}
    </>
}

export default page