import Image from 'next/image'
import React from 'react'

const SideImage = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative">
      <Image 
        src="/authSideImg.png"
        alt='auth side image for shortly'
        fill
        sizes='100vw'
        className='object-cover'
      />
    </div>
  )
}

export default SideImage