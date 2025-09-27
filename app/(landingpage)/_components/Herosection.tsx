import Button from '@/components/Button'
import Image from 'next/image'
import React from 'react'
import logo from '@/public/logo.png'

const Herosection = () => {
  return (
    <section className='h-screen flex flex-col justify-center items-center gap-4'>
        <div className='Logo mb-2'>
            <Image className='img-spin' height={120} src={logo} alt='shortlink'/>
        </div>
        <div className='title md:text-2xl text-[calc((0.8*1.5rem)] text-animated'>
            Hi, Everyone
        </div>
        <div className='description text-animated mb-10 md:text-[5.5rem] text-[calc(0.5*5.5rem)] font-bold max-w-5xl text-center'>
            Shortly build <span className='bg-gradient-to-r from-[var(--main-color)] via-[#4f7eed] to-[var(--main-color)] inline-block text-transparent bg-clip-text'>robust</span> <br/> digital connections
        </div>
        <div className='text-animated'>
            <Button title='Tri it now'/>
        </div>
    </section>
  )
}

export default Herosection