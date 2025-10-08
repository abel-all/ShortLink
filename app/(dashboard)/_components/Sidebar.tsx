'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import logo from '@/public/logo.png'
import { MoreVertical, PanelLeftOpen, PanelRightOpen } from 'lucide-react'
import useUser from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import useDashboard from '@/context/DashboardContext'

const Sidebar = ({children}: {children: React.ReactNode}) => {

  const {isExpanded, setIsExpanded} = useDashboard();
  const { firstName, lastName, email } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth <= 768) setIsExpanded(false)

    const onResize = () => {
        setIsExpanded(window.innerWidth > 768);
    }

    onResize();

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [])

  const handleClick = () => {
    setIsExpanded(prev => !prev);
  }

  const handleImageClick = () => {
        router.replace("/");
    }

  const usernameLetters = firstName[0].toUpperCase() + lastName[0].toUpperCase();

  return (
    <aside className='h-screen z-42 fixed left-0 top-0'>
        <nav className='h-full flex flex-col bg-background border-r border-[var(--border-color-white)] dark:border-[var(--border-color-dark)]'>
            <div className='flex justify-between items-center p-4 pb-6'>
                <Image 
                    onClick={handleImageClick}
                    className={`cursor-pointer overflow-hidden transition-all ${isExpanded ? "md:w-10" : "md:w-0"}`}
                    src={logo}
                    alt='shortly logo'
                    width={40} 
                />
                <button onClick={handleClick} className='max-md:hidden p-1.5 rounded-lg cursor-pointer'>
                    {isExpanded ? <PanelRightOpen /> : <PanelLeftOpen />}
                </button>
            </div>
            
            <ul className='flex-1 px-3'>{children}</ul>

            <div className={`cursor-pointer relative group border-t flex p-5 ${!isExpanded && "pb-2.5"}`}>
                <div className={`flex justify-center items-center font-semibold w-10 h-10 bg-[var(--border-color-white)] dark:bg-[var(--border-color-dark)] rounded-full`} >
                    {usernameLetters}
                </div>
                <div className={`flex justify-between items-center overflow-hidden transition-all ${isExpanded ? "w-52 ml-3" : "w-0"}`}>
                    <div>
                        <h4 className='font-medium'>{firstName + " " + lastName}</h4>
                        <span className='text-xs opacity-90'>{email}</span>
                    </div>
                    <MoreVertical />
                    {!isExpanded && <div 
                        className="absolute left-full rounded-lg px-3 py-1 ml-6 bg-[#b0d5ff] text-[var(--second-color)] text-sm invisible opacity-20 translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                        "
                    >
                        {firstName + " " + lastName} <br/> {email}
                    </div>}
                </div>
            </div>

        </nav>
    </aside>
  )
}

export default Sidebar