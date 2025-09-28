import ProtectedRouteWrapper from '@/middleware/ProtectedRouteWrapper'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <ProtectedRouteWrapper>
        {children}
    </ProtectedRouteWrapper>
  )
}

export default layout