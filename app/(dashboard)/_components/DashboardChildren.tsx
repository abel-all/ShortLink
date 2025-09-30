'use client'
import useDashboard from '@/context/DashboardContext'
import React from 'react'

const DashboardChildren = ({children}: {children: React.ReactNode}) => {

  const { isExpanded } = useDashboard(); 

  return (
    <div className={`mt-[4.625rem] ${isExpanded ? "ml-[300px]" : "ml-[80px]"}`}>
      {children}
    </div>
  )
}

export default DashboardChildren