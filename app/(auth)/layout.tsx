import UnprotectedRouteWrapper from '@/middleware/UnrotectedRouteWrapper'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UnprotectedRouteWrapper>
        {children}
    </UnprotectedRouteWrapper>
  )
}

export default AuthLayout