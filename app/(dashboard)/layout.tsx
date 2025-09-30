import ProtectedRouteWrapper from '@/middleware/ProtectedRouteWrapper'
import React from 'react'
import Header from './_components/Header'
import Sidebar from './_components/Sidebar'
import { House, LifeBuoy, Link, Settings } from 'lucide-react'
import SidebarItem from './_components/SidebarItem'

const sidebarItems = [
  {
    icon: <House />,
    text: "Home",
    active: true,
  },
  {
    icon: <Link />,
    text: "Links",
    active: false,
  },

]

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <ProtectedRouteWrapper>
      <Header />
      <div className='leading-none flex gap-1'>
        <Sidebar>
          {sidebarItems.map((item, index) => (
            <SidebarItem key={index} {...item}/>
          ))}
          <hr className='my-3'/>
          <SidebarItem icon={<Settings />} text="Settings" />
          <SidebarItem icon={<LifeBuoy />} text="Help" />
        </Sidebar>
        <div className='mt-[4.625rem]'>
          {children}
        </div>
      </div>
    </ProtectedRouteWrapper>
  )
}

export default layout