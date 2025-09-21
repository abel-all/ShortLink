import Image from 'next/image'
import React from 'react'
import logo from '@/public/logo.png'
import logo_white from '@/public/logo_white.png'
import { ModeToggle } from '@/components/modeToogle'
import { Button } from "@/components/ui/button"
import Link from 'next/link'


const Header = () => {
  return (
    <header className='h-10 w-full border-b border-[#d0d0d0] dark:border-[#2f2f2f] fixed z-50 top-0 left-0 bg-background px-4'>
        <div className='flex justify-between items-center h-full w-full'>
            <Image className='dark:hidden' height={40} src={logo} alt='shortlink'/>
            <Image className='dark:block hidden' height={40} src={logo_white} alt='shortlink'/>
            <div className='flex gap-0 items-center'>
                <ModeToggle/>
            </div>
        </div>
    </header>
  )
}

export default Header