import React from 'react'

interface Props {
    title: string | React.ReactNode;
    wfull?: string;
    disabled?: boolean;
    isOutlined?: boolean;
    type?: "submit" | "reset" | "button" | undefined;
    textColor?: string;
}

const ButtonContent = ({title, wfull, disabled, isOutlined=false, type="button", textColor="bg-[var(--main-color)] hover:bg-[var(--main-color)]/90 dark:text-black text-white"}: Props) => {
    return (
        <button 
            type={type}
            disabled={disabled} 
            className={`${wfull} cursor-pointer rounded-full h-12 flex overflow-hidden justify-center 
            items-center ${isOutlined ? "bg-transparent border border-[var(--border-color-white)] dark:border-[var(--border-color-black)] text-black dark:text-white" : `${textColor}`} duration-300`}
        >
            <div className='md:text-[1.125rem] text-[calc((0.8*1.125rem)] font-medium'>
                {title}
            </div>
        </button>
    )
}

export default ButtonContent