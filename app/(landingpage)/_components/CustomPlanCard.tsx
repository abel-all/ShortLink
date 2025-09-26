import React from 'react'
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface benefitsObjectProps extends LucideProps {
    iconName: keyof typeof dynamicIconImports;
    title: string;
    description: string;
}

interface Props extends LucideProps {
    title: string;
    description: string;
    oldPrice: string;
    price: string;
    everythingTitle: string;
    everythingIconName: keyof typeof dynamicIconImports;
    benefitsObject: benefitsObjectProps;
    isFreePlan: boolean;
}

interface Props1 extends LucideProps {
    benefitsObject: benefitsObjectProps;
}

const CustomCardBenifit = ({benefitsObject}: Props1) => {

}

const CustomPlanCard = ({title, description, oldPrice, price, everythingTitle, everythingIconName, benefitsObject, isFreePlan}: Props) => {
  return (
    <div className="w-full max-w-96 min-h-24 border border-[#d0d0d0] dark:border-[#424242] rounded-4xl px-4 py-6">
            <div className='flex flex-col gap-7'>
              <div className='flex flex-col gap-2'>
                <div className="title md:text-3xl font-medium">Plus</div>
                <div className="description md:text-base font-normal leading-[18px] opacity-80">
                  For power users <span className="opacity-100 font-semibold">branded links</span>, deeper analytics and higher limits.
                </div>
                <div>
                  <div className='text-lg font-normal line-through opacity-80'>
                    USD 14.99 / month
                  </div>
                  <div className="price text-lg font-normal"><span className="bg-gradient-to-r from-[var(--main-color)] via-[#4f7eed] to-[var(--main-color)] inline-block text-transparent bg-clip-text">USD<span className="text-4xl font-medium">6.99</span></span>/month</div>
                </div>
              </div>
              <div className="call-to-action-btn">
                <Button title="Try Plus — 7-day free trial" wfull="w-full" />
              </div>
              <div className='flex flex-col'>
                <div className='flex items-center gap-4'>
                  <BadgeCheck className="text-[var(--main-color)]"/>
                  <div className='text-lg font-medium'>Everything in Free and:</div>
                </div>

                <div className="benifits-1 w-full mt-4">
                  <div className="mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]"></div>
                  <div className="flex gap-4">
                    <Globe />
                    <div className="flex text-base flex-col justify-center">
                      <div className="font-bold">Custom domain</div>
                      <div className="font-normal">One custom domain for branded links</div>
                    </div>
                  </div>
                </div>

                <div className="benifits-2 w-full mt-4">
                  <div className="mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]"></div>
                  <div className="flex gap-4">
                    <BarChart2 />
                    <div className="flex text-base flex-col justify-center">
                      <div className="font-bold">Advanced analytics</div>
                      <div className="font-normal">UTM support, segmented reports & CSV export</div>
                    </div>
                  </div>
                </div>

                <div className="benifits-3 w-full mt-4">
                  <div className="mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]"></div>
                  <div className="flex gap-4">
                    <Zap />
                    <div className="flex text-base flex-col justify-center">
                      <div className="font-bold">Integrations</div>
                      <div className="font-normal">Connect to Zapier & webhooks</div>
                    </div>
                  </div>
                </div>

                <div className="benifits-4 w-full mt-4">
                  <div className="mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]"></div>
                  <div className="flex gap-4">
                    <Code />
                    <div className="flex text-base flex-col justify-center">
                      <div className="font-bold">API access</div>
                      <div className="font-normal">API keys & developer tools (rate-limited)</div>
                    </div>
                  </div>
                </div>

                <div className="benifits-5 w-full mt-4">
                  <div className="mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]"></div>
                  <div className="flex gap-4">
                    <LifeBuoy />
                    <div className="flex text-base flex-col justify-center">
                      <div className="font-bold">Priority support</div>
                      <div className="font-normal">Faster email support response times</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default CustomPlanCard