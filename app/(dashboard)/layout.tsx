import ProtectedRouteWrapper from '@/middleware/ProtectedRouteWrapper'
import React from 'react'
import Header from './_components/Header'
import Sidebar from './_components/Sidebar'
import { House, LifeBuoy, Link, Settings } from 'lucide-react'
import SidebarItem from './_components/SidebarItem'
import { DashboardProvider } from '@/context/DashboardContext'
import DashboardChildren from './_components/DashboardChildren'

const sidebarItems = [
  {
    icon: <House />,
    text: "Home",
    href: "/home",
    exact: true,
  },
  {
    icon: <Link />,
    text: "Links",
    href: "/links",
  },

]

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <ProtectedRouteWrapper>
      <Header />
      <div className='leading-none'>
        <DashboardProvider>
          <Sidebar>
            {sidebarItems.map((item, index) => (
              <SidebarItem key={index} {...item}/>
            ))}
            <hr className='my-3'/>
            <SidebarItem icon={<Settings />} text="Settings" href={"/settings"} />
            <SidebarItem icon={<LifeBuoy />} text="Help" href={"/help"} />
          </Sidebar>
          <DashboardChildren>
            {children}
          </DashboardChildren>
        </DashboardProvider>
      </div>
    </ProtectedRouteWrapper>
  )
}

export default layout