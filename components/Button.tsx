import React from 'react'

interface Props {
    title: string;
}

const Button = ({title}: Props) => {
  return (
    <button className='relative cursor-pointer rounded-full h-12 flex overflow-hidden justify-center items-center px-8 bg-[var(--main-color)] hover:bg-[var(--main-color)]/90 duration-300'>
        <div className='md:text-[1.125rem] text-[calc((0.8*1.125rem)] font-[500] dark:text-black text-white'>
            {title}
        </div>
    </button>
  )
}

export default Button