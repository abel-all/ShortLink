import React from 'react'
import { BadgeCheck, LucideIcon, LucideProps } from 'lucide-react';
import Button from '@/components/Button';
import CustomCardBenifit from './CustomCardBenifit';

export interface benefitsObjectProps {
    Icon: LucideIcon;
    title: string;
    description: string;
}

interface Props extends LucideProps {
    title: string;
    description: React.ReactNode;
    oldPrice?: string;
    price: string;
    everythingTitle?: string;
    benefitsObject: benefitsObjectProps[];
    isFreePlan: boolean;
}

const CustomPlanCard = ({title, description, oldPrice, price, everythingTitle, benefitsObject, isFreePlan}: Props) => {
  return (
    <div className="w-full max-w-96 h-[832px] border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)] rounded-4xl px-8 py-10">
            <div className='flex flex-col gap-7'>
              <div className='flex flex-col gap-2'>
                <div className="title md:text-3xl font-medium">{title}</div>
                {description}
                {isFreePlan ? 
                    <div className="price text-lg font-normal mt-[28px]">USD<span className="text-4xl font-medium">{price}</span>/month</div>
                : 
                    <div>
                        <div className='text-lg font-normal line-through opacity-80'>
                            {oldPrice}
                        </div>
                        <div className="price text-lg font-normal"><span className="bg-gradient-to-r from-[var(--main-color)] via-[#4f7eed] to-[var(--main-color)] inline-block text-transparent bg-clip-text">USD<span className="text-4xl font-medium">{price}</span></span>/month</div>
                    </div>
                }
              </div>
              <div className="call-to-action-btn">
                <Button title="Get started" wfull="w-full" redirectedRoute="/signup" version="redirect" />
              </div>
              <div className={`flex flex-col pb-10 ${isFreePlan ? "mt-[29px]" : ""}`}>
                {!isFreePlan && <div className='flex items-center gap-4'>
                  <BadgeCheck className="text-[var(--main-color)]"/>
                  <div className='text-lg font-medium'>{everythingTitle}</div>
                </div>}

                {benefitsObject.map((benifit, index) => (
                    <CustomCardBenifit key={index} {...benifit} />
                ))}
              </div>
            </div>
          </div>
  )
}

export default CustomPlanCard