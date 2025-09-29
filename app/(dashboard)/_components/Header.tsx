'use client'

import Image from 'next/image'
import React from 'react'
import logo from '@/public/logo.png'
import { ModeToggle } from '@/components/modeToogle'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import useLocalStorageManager from '@/hooks/useLocalStorageManager'


const Header = () => {

    const router = useRouter();
    const { removeItem } = useLocalStorageManager(); 

    const handleClick = () => {
        router.replace("/");
    }

    const handleLogoutClick = () => {
        removeItem("accessToken");
        removeItem("expiresIn");
        router.push("/signin")
    }

  return (
    <header className='h-[4.625rem] w-full border-b border-[var(--border-color-white)] dark:border-[#2f2f2f] fixed z-50 top-0 left-0 bg-background px-4'>
        <div className='flex justify-between items-center h-full w-full'>
            <Image onClick={handleClick} className='cursor-pointer' height={40} src={logo} alt='shortlink'/>
            <div className='flex gap-3 items-center'>
                <ModeToggle/>
                <LogOut 
                    onClick={handleLogoutClick}
                    className='cursor-pointer hover:text-red-500 transition-all duration-300'
                />
            </div>
        </div>
    </header>
  )
}

export default Header