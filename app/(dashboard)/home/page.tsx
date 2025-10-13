'use client'

import useUser from '@/context/UserContext'
import React, { useEffect, useState } from 'react'
import CreateNewLink from '../_components/CreateNewLink';
import { AlertCircle, ChartNoAxesCombined, Earth, MonitorSmartphone } from 'lucide-react';
import HomeCard from '../_components/HomeCard';
import CountryVisitorsTable from '../_components/CountryVisitorsTable';
import ChartPieLabel from '../_components/ChartPieLabel';
import { ShortLink } from '../links/page';
import useLocalStorageManager from '@/hooks/useLocalStorageManager';
import { Skeleton } from '@/components/ui/skeleton';


export interface StatItem {
  key: string;
  count: number;
}

export interface Totals {
  totalVisitors: number;
  totalLinks: number;
  passed: number;
  blocked: number;
}

export interface AnalyticsResponse {
  total: Totals;
  byDeviceType: StatItem[];
  byOs: StatItem[];
  byCountry: StatItem[];
  byReferer: StatItem[];
}

const page = () => {
  
  const { firstName } = useUser();
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchedData, setFetchedData] = useState<AnalyticsResponse>({
    total: {
      totalVisitors: 0,
      totalLinks: 0,
      passed: 0,
      blocked: 0,
    },
    byDeviceType: [],
    byOs: [],
    byCountry: [],
    byReferer: [],
  })

  const { getItem } = useLocalStorageManager();

  const fetchData = async () => {
    // setIsLoading(true)
     try {
        // API call
        const result = await fetch("http://localhost:8080/api/v1/analytics/user/me/all", {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getItem('accessToken')}`
          },
        });
  
        if (!result.ok) {
          if (result.status === 401) {
            setErrors(["unauthorized"])
          }
          else {
            setErrors(["Error, please try again!"]);
          }
          return
        }
  
        const body = await result.json();
        setFetchedData(body);
  
      } catch (err) {
        setErrors(["An error occurred, try again"])
      } finally {
        setIsLoading(false)
      }
  }
  
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-4">
        {/* Header */}
        <div className="mb-8 sm:mb-10 flex max-md:flex-col gap-2 md:justify-between md:items-center">
          <h1 className="text-4xl font-medium">
            Hello, {firstName}
          </h1>
          <CreateNewLink setLinks={setLinks}/>
        </div>

        {/* Crads */}
        <section className='border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] rounded-xl p-6 sm:p-8 mb-6'>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ChartNoAxesCombined className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-medium">
              Statistics
            </div>
          </div>

          {isLoading ? (<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-40 rounded-lg w-full" />
            ))}
          </div>) : 
          errors.length > 0 ? 
            (<div className='rounded-xl w-full h-[160px] mb-6 bg-red-50 dark:bg-red-900/40 flex flex-col gap-2 items-center justify-center'>
              <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              {errors.map((error, index) => (
                <div key={index} className='text-base text-red-800 dark:text-red-300'>
                  {error}
                </div>
              ))}
            </div>) : (<HomeCard {...fetchedData.total} />)}
        </section>

        {/* Visitors Section */}
        <section className='border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] rounded-xl p-6 sm:p-8 mb-6'>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Earth className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-medium">
              Visitors
            </div>
          </div>

          <CountryVisitorsTable />
        </section>

        {/* Devices and software Section */}
        <section className='border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] rounded-xl p-6 sm:p-8 mb-6'>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <MonitorSmartphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-medium">
              Devices and software
            </div>
          </div>
          <div className='flex max-md:flex-col gap-4 max-md:items-center'>
            <div className='w-1/2'>
              <ChartPieLabel title='Devices' />
            </div>
            <div className='w-1/2'>
              <ChartPieLabel title='Operating systems' />
            </div>
          </div>
        </section>
    </div>
  )
}

export default page