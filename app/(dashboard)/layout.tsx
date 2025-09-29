import ProtectedRouteWrapper from '@/middleware/ProtectedRouteWrapper'
import React from 'react'
import Header from './_components/Header'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <ProtectedRouteWrapper>
      <Header />
      <div className='flex gap-1 mt-[4.625rem]'>
        {/* <Sidebar /> */}
        {children}
      </div>
    </ProtectedRouteWrapper>
  )
}

export default layout