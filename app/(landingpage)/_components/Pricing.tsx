import Button from '@/components/Button'
// import { ChartPie, QrCode, Unlink } from 'lucide-react'
import React from 'react'
import { Unlink, ChartPie, QrCode, Globe, BarChart2, Zap, Key, Users, Server, Monitor, Code, LifeBuoy, ShieldCheck, Rocket, BadgeCheck } from "lucide-react";



const Pricing = () => {
  return (
    <section>
        <div className='flex flex-col gap-14 items-center'>
            <div className='text-center font-sans text-xl md:text-5xl font-semibold'>
                Plans
            </div>
            {/* <div className='w-full max-w-96 min-h-24 border border-[#d0d0d0] dark:border-[#424242] rounded-4xl px-4 py-6'>
                <div className='title md:text-3xl font-medium'>Free</div>
                <div className='description md:text-base font-normal leading-[18px] opacity-80'>Perfect for <span className='opacity-100 font-semibold'>personal use</span>, shorten links, share fast, and check basic stats.</div>
                <div className='price text-lg font-normal'><span className='text-4xl font-medium'>0</span>Usd/month</div>
                <div className='call-to-action-btn'>
                  <Button title='Get started' wfull='w-full'/>
                </div>
                <div className='benifits-1 w-full mt-4'>
                  <div className='mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]'></div>
                  <div className='flex gap-4'>
                    <Unlink />
                    <div className='flex text-base flex-col justify-center'>
                      <div className='font-bold'>Free trial</div>
                      <div className='font-normal'>Up to 100 short links a month</div>
                    </div>
                  </div>
                </div>
                <div className='benifits-2 w-full mt-4'>
                  <div className='mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]'></div>
                  <div className='flex gap-4'>
                    <ChartPie />
                    <div className='flex text-base flex-col justify-center'>
                      <div className='font-bold'>Analytics</div>
                      <div className='font-normal'>Basic click analytics (last 30 days)</div>
                    </div>
                  </div>
                </div>
                <div className='benifits-3 w-full mt-4'>
                  <div className='mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]'></div>
                  <div className='flex gap-4'>
                    <QrCode />
                    <div className='flex text-base flex-col justify-center'>
                      <div className='font-bold'>QR code</div>
                      <div className='font-normal'>Custom slugs & QR codes</div>
                    </div>
                  </div>
                </div>
            </div> */}

          {/* ------------------ Free plan (5 benefits) ------------------ */}
          <div className="w-full max-w-96 min-h-24 border border-[#d0d0d0] dark:border-[#424242] rounded-4xl px-4 py-6">
            <div className="title md:text-3xl font-medium">Free</div>
            <div className="description md:text-base font-normal leading-[18px] opacity-80">
              Perfect for <span className="opacity-100 font-semibold">personal use</span>, shorten links, share fast, and check basic stats.
            </div>
            <div className="price text-lg font-normal"><span className="text-4xl font-medium">0</span>Usd/month</div>
            <div className="call-to-action-btn">
              <Button title="Get started" wfull="w-full" />
            </div>

            <div className="benifits-1 w-full mt-4">
              <div className="mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]"></div>
              <div className="flex gap-4">
                <Unlink />
                <div className="flex text-base flex-col justify-center">
                  <div className="font-bold">Free trial</div>
                  <div className="font-normal">Up to 100 short links a month</div>
                </div>
              </div>
            </div>

            <div className="benifits-2 w-full mt-4">
              <div className="mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]"></div>
              <div className="flex gap-4">
                <ChartPie />
                <div className="flex text-base flex-col justify-center">
                  <div className="font-bold">Analytics</div>
                  <div className="font-normal">Basic click analytics (last 30 days)</div>
                </div>
              </div>
            </div>

            <div className="benifits-3 w-full mt-4">
              <div className="mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]"></div>
              <div className="flex gap-4">
                <QrCode />
                <div className="flex text-base flex-col justify-center">
                  <div className="font-bold">QR code</div>
                  <div className="font-normal">Custom slugs & QR codes</div>
                </div>
              </div>
            </div>

            <div className="benifits-4 w-full mt-4">
              <div className="mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]"></div>
              <div className="flex gap-4">
                <Monitor />
                <div className="flex text-base flex-col justify-center">
                  <div className="font-bold">Browser add-ons</div>
                  <div className="font-normal">Quick shorten from your browser toolbar</div>
                </div>
              </div>
            </div>

            <div className="benifits-5 w-full mt-4">
              <div className="mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]"></div>
              <div className="flex gap-4">
                <Users />
                <div className="flex text-base flex-col justify-center">
                  <div className="font-bold">Community support</div>
                  <div className="font-normal">Access to docs & community forum</div>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------ Plus plan (5 benefits) ------------------ */}
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

          {/* ------------------ Pro plan (5 benefits) ------------------ */}
          <div className="w-full max-w-96 min-h-24 border border-[#d0d0d0] dark:border-[#424242] rounded-4xl px-4 py-6">
            <div className="title md:text-3xl font-medium">Pro</div>
            <div className="description md:text-base font-normal leading-[18px] opacity-80">
              For businesses & teams — <span className="opacity-100 font-semibold">unlimited links</span>, API access and priority support.
            </div>
            <div className="price text-lg font-normal"><span className="text-4xl font-medium">29</span>Usd/month</div>
            <div className="call-to-action-btn">
              <Button title="Upgrade to Pro" wfull="w-full" />
            </div>

            <div className="benifits-1 w-full mt-4">
              <div className="mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]"></div>
              <div className="flex gap-4">
                <Key />
                <div className="flex text-base flex-col justify-center">
                  <div className="font-bold">Developer API</div>
                  <div className="font-normal">API keys, SDKs and unlimited requests</div>
                </div>
              </div>
            </div>

            <div className="benifits-2 w-full mt-4">
              <div className="mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]"></div>
              <div className="flex gap-4">
                <Users />
                <div className="flex text-base flex-col justify-center">
                  <div className="font-bold">Teams</div>
                  <div className="font-normal">Multiple seats, roles & SSO</div>
                </div>
              </div>
            </div>

            <div className="benifits-3 w-full mt-4">
              <div className="mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]"></div>
              <div className="flex gap-4">
                <Server />
                <div className="flex text-base flex-col justify-center">
                  <div className="font-bold">Enterprise features</div>
                  <div className="font-normal">A/B testing, deep analytics & SSO</div>
                </div>
              </div>
            </div>

            <div className="benifits-4 w-full mt-4">
              <div className="mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]"></div>
              <div className="flex gap-4">
                <ShieldCheck />
                <div className="flex text-base flex-col justify-center">
                  <div className="font-bold">SLA & security</div>
                  <div className="font-normal">Uptime guarantee & advanced security</div>
                </div>
              </div>
            </div>

            <div className="benifits-5 w-full mt-4">
              <div className="mb-5 w-full h-0.5 bg-[#d0d0d0] dark:bg-[#424242]"></div>
              <div className="flex gap-4">
                <Rocket />
                <div className="flex text-base flex-col justify-center">
                  <div className="font-bold">Onboarding</div>
                  <div className="font-normal">Dedicated onboarding & training sessions</div>
                </div>
              </div>
            </div>
          </div>


        </div>
    </section>
  )
}

export default Pricing