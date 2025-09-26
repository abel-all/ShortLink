import React from 'react'
import { benefitsObjectProps } from './CustomPlanCard'

const CustomCardBenifit = ({Icon, title, description}: benefitsObjectProps) => {
    return (
        <div className="benifits-1 w-full mt-4">
        <div className="mb-5 w-full h-[1px] bg-[#d0d0d0] dark:bg-[#424242]"></div>
        <div className="flex gap-4">
            <Icon />
            <div className="flex text-base flex-col justify-center">
            <div className="font-bold">{title}</div>
            <div className="font-normal">{description}</div>
            </div>
        </div>
        </div>
    )
}

export default CustomCardBenifit