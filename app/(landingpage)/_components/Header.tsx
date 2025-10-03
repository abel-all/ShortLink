import Image from 'next/image'
import React from 'react'
import logo from '@/public/logo.png'
import { ModeToggle } from '@/components/modeToogle'
import Link from 'next/link'
import Button from '@/components/Button'


const Header = () => {
  return (
    <header className='h-[4.625rem] w-full border-b border-[var(--border-color-white)] dark:border-[#2f2f2f] fixed z-40 top-0 left-0 bg-background px-4'>
        <div className='flex justify-between items-center h-full w-full'>
            <Image className='' height={40} src={logo} alt='shortlink'/>
            <div className='flex gap-0 items-center'>
                <ModeToggle/>
                <Button title='Try ShortLink' redirectedRoute="/signup" version="redirect"/>
            </div>
        </div>
    </header>
  )
}

export default Header