import Image from 'next/image'
import React from 'react'
import logo from '@/public/logo.png'

const Footer = () => {
  return (
    <footer className='w-full h-28 flex justify-center items-center gap-5 border-t border-[var(--border-color-white)] dark:border-[#2f2f2f]'>
      <Image className='' height={40} src={logo} alt='shortlink'/>
      <div className='text-2xl font-semibold'>Shortly</div>
    </footer>
  )
}

export default Footer