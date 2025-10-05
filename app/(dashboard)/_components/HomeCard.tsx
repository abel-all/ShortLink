import React from 'react'

interface Props {
    title: string;
    number: number;
}

const HomeCard = ({title, number}: Props) => {
  return (
    <div className={`bg-blue-50/30 dark:bg-blue-50/10 flex flex-col justify-between h-40 rounded-lg border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] px-4 py-6`}>
        <div className='text-lg font-normal opacity-70'>
            {title}
        </div>
        <div className='text-center mb-4 text-2xl md:text-5xl font-semibold opacity-80 z-10'>
            {number}
        </div>
    </div>
  )
}

export default HomeCard