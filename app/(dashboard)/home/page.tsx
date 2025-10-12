'use client'

import useUser from '@/context/UserContext'
import React, { useEffect, useState } from 'react'
import CreateNewLink from '../_components/CreateNewLink';
import { ChartNoAxesCombined, Earth, MonitorSmartphone } from 'lucide-react';
import HomeCard from '../_components/HomeCard';
import CountryVisitorsTable from '../_components/CountryVisitorsTable';
import ChartPieLabel from '../_components/ChartPieLabel';
import { ShortLink } from '../links/page';
import useLocalStorageManager from '@/hooks/useLocalStorageManager';

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
}


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
        // if (body.message !== "OK") {
        //   setErrors(["Error, please try again!"]);
        // } else {
        // }
  
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

          <HomeCard {...fetchedData.total} />
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
              <ChartPieLabel title='Devices' chartData={chartData} chartConfig={chartConfig}/>
            </div>
            <div className='w-1/2'>
              <ChartPieLabel title='Operating systems' chartData={chartData} chartConfig={chartConfig}/>
            </div>
          </div>
        </section>
    </div>
  )
}

export default page