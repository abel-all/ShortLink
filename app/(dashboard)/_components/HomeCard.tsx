import React from 'react'
import { Totals } from '../home/page'

const HomeCard = ({totalVisitors, totalLinks, passed, blocked}: Totals) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className={`bg-blue-50/30 dark:bg-blue-50/10 flex flex-col justify-between h-40 rounded-lg border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] px-4 py-6`}>
            <div className='text-lg font-normal opacity-70'>
                Links
            </div>
            <div className='text-center mb-4 text-2xl md:text-5xl font-semibold opacity-80 z-10'>
                {totalLinks}
            </div>
        </div>

        <div className={`bg-blue-50/30 dark:bg-blue-50/10 flex flex-col justify-between h-40 rounded-lg border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] px-4 py-6`}>
            <div className='text-lg font-normal opacity-70'>
                Visitors
            </div>
            <div className='text-center mb-4 text-2xl md:text-5xl font-semibold opacity-80 z-10'>
                {totalVisitors}
            </div>
        </div>

        <div className={`bg-blue-50/30 dark:bg-blue-50/10 flex flex-col justify-between h-40 rounded-lg border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] px-4 py-6`}>
            <div className='text-lg font-normal opacity-70'>
                Approved
            </div>
            <div className='text-center mb-4 text-2xl md:text-5xl font-semibold opacity-80 z-10'>
                {passed}
            </div>
        </div>

        <div className={`bg-blue-50/30 dark:bg-blue-50/10 flex flex-col justify-between h-40 rounded-lg border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] px-4 py-6`}>
            <div className='text-lg font-normal opacity-70'>
                Blocked
            </div>
            <div className='text-center mb-4 text-2xl md:text-5xl font-semibold opacity-80 z-10'>
                {blocked}
            </div>
        </div>
    </div>
  )
}

export default HomeCard