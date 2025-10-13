import Button from '@/components/Button'
import Image from 'next/image'
import React from 'react'
import logo from '@/public/logo.png'

const Herosection = () => {
  return (
    <section className='text-animated min-h-screen flex flex-col justify-center items-center gap-4'>
        <div className='Logo mb-2'>
            <Image className='img-spin' height={120} src={logo} alt='shortlink'/>
        </div>
        <div className='title md:text-2xl text-lg'>
            Hi, Everyone
        </div>
        <div className='description mb-6 md:text-7xl text-4xl font-bold max-w-5xl text-center'>
            Shortly build <span className='bg-gradient-to-r from-[var(--main-color)] via-[#4f7eed] to-[var(--main-color)] inline-block text-transparent bg-clip-text'>robust</span> <br/> digital connections
        </div>
        <Button title='Try it now' redirectedRoute="/signup" version="redirect" />
    </section>
  )
}

export default Herosection