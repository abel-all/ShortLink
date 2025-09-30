'use client'

import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useDashboard from '@/context/DashboardContext';

interface Props {
    icon: React.ReactNode;
    text: string;
    href: string;
    exact?: boolean;
}

const SidebarItem = ({icon, text, href, exact=false}: Props) => {

  const { isExpanded } = useDashboard();

  const pathname = usePathname();

  const isActive = exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')

  return (
    <Link 
        href={href}
        className={`
            relative flex items-center py-2 px-3 my-1
            font-medium rounded-full cursor-pointer transition-colors group
            ${
                isActive
                ? "bg-gradient-to-tr from-[var(--second-color)]/50 to-[var(--main-color)]/70 dark:to-[var(--main-color)] "
                : "hover:bg-[var(--main-color)]/20 dark:hover:bg-[var(--main-color)]/40 text-foreground/60"
            }
    `}>
        {icon}
        <span className={`
            text-xl font-normal overflow-hidden transition-all ${isExpanded ?
                "w-52 ml-3" : "w-0"
            }
        `}>
            {text}
        </span>
        {!isExpanded && <div 
            className="absolute left-full rounded-full px-3 py-1 ml-6 bg-[#b0d5ff] text-[var(--second-color)] text-sm invisible opacity-20 translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            "
        >
            {text}
        </div>}
    </Link>
  )
}

export default SidebarItem