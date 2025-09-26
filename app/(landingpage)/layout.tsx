import React from 'react'
import Header from './_components/Header';
import Footer from './_components/Footer';

interface props {
    children: React.ReactNode;
}

const LandingPageLayout = ({ children }: props) => {
  return (
    <div className='tracking-tight leading-21 font-sans'>
        <Header />
        {children}
        <Footer />
    </div>
  )
}

export default LandingPageLayout