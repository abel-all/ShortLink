import React from 'react'

interface Props {
    title: string;
    wfull?: string;
}

const ButtonContent = ({title, wfull="px-8"}: Props) => {
    return (
        <button className={`${wfull} cursor-pointer rounded-full h-12 flex overflow-hidden justify-center items-center bg-[var(--main-color)] hover:bg-[var(--main-color)]/90 duration-300`}>
            <div className='md:text-[1.125rem] text-[calc((0.8*1.125rem)] font-[500] dark:text-black text-white'>
                {title}
            </div>
        </button>
    )
}

export default ButtonContent