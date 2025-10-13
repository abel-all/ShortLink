'use client'

import { formatShortNumber } from '@/lib/formatShortNumber';
import { Eye, Link, Users } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import React, { useEffect, useState } from 'react'

interface StatCard {
  id: string;
  title: string;
  icon: any;
  value: number;
}

interface Statistics {
    totalLinks: number;
    totalVisites: number;
    totalUsers: number;
}

const PublicStatistics = () => {

    const [data, setData] = useState<Statistics>({
        totalLinks: 0,
        totalVisites: 0,
        totalUsers: 0,
    });

    const fetchData = async () => {
        try {
        const result = await fetch("http://localhost:8080/api/v1/public/total", {
            method: 'GET',
        });
      
        if (!result.ok) {
            setData({
                totalLinks: 0,
                totalVisites: 0,
                totalUsers: 0,
            });
            return
        }      
        
        const body = await result.json();

        setData({
            ...body.data,
        });
        
      } catch (error) {
        setData({
            totalLinks: 0,
            totalVisites: 0,
            totalUsers: 0,
        });
      }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const StatCard: StatCard[] = [
        {
          id: "links",
          title: "Total Links",
          icon: "link",
          value: Number(data.totalLinks ?? 0),
        },
        {
          id: "visits",
          title: "Total Visits",
          icon: "eye",
          value: Number(data.totalVisites ?? 0),
        },
        {
          id: "users",
          title: "Total Users",
          icon: "users",
          value: Number(data.totalUsers ?? 0),
        },
    ];

  return (
    <section className='flex flex-col gap-14 items-center'>
        <div className='text-center max-md:max-w-52 text-xl md:text-5xl font-semibold'>
            Adopted and loved by millions of users
        </div>
        <div className='flex flex-wrap gap-10'>
          {StatCard.map(({id, title, icon, value}) => (
            <div key={id} className='relative overflow-hidden p-6 h-72 w-64 border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] rounded-4xl'>
                <div className='absolute -bottom-8 -right-4 -rotate-[30deg] rounded-2xl py-6 px-10 border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)]'>
                    <DynamicIcon name={icon} size={105} strokeWidth={1}/>
                </div>
                <div className='text-6xl font-extrabold'>{formatShortNumber(value+46456456)}</div>
                <div className='text-lg text-muted-foreground'>{title}</div>
            </div> 
          ))}
        </div>
    </section>
  )
}

export default PublicStatistics