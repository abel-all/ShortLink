import Image from 'next/image'
import React from 'react'
import logo from '@/public/logo.png'
import logo_white from '@/public/logo_white.png'

const Footer = () => {
  return (
    <div className='w-full h-28 flex flex-col justify-center items-center border-t border-[#d0d0d0] dark:border-[#2f2f2f]'>
      <Image className="dark:hidden h-12 md:h-16" src={logo} alt='shortlink'/>
      <Image className="dark:block hidden h-12 md:h-16" src={logo_white} alt='shortlink'/>
      <div className='max-md:text-xs'>by <strong>Abdessamad</strong> :)</div>
    </div>
  )
}

export default Footer