import React from 'react'
import { Unlink, ChartPie, QrCode, Globe, BarChart2, Zap, Key, Users, Server, Monitor, Code, LifeBuoy, ShieldCheck, Rocket, BadgeCheck } from "lucide-react";
import CustomPlanCard from './CustomPlanCard';

const cardContent = [
  {
    title: "Free",
    description: <div className="description md:text-base font-normal leading-[18px] opacity-80">
                    Perfect for <span className='opacity-100 font-semibold'>personal use</span>, shorten links, share fast, and check basic stats.
                  </div>,
    price: "0",
    benefitsObject: [
      {
        Icon: Unlink,
        title: "Free trial",
        description: "Up to 100 short links a month",
      },
      {
        Icon: ChartPie,
        title: "Analytics",
        description: "Basic click analytics (last 30 days)",
      },
      {
        Icon: QrCode,
        title: "QR code",
        description: "Custom slugs & QR codes",
      },
      {
        Icon: Monitor,
        title: "Browser add-ons",
        description: "Quick shorten from your browser toolbar",
      },
      {
        Icon: Users,
        title: "Community support",
        description: "Access to docs & community forum",
      },
    ],
    isFreePlan: true,
  },
  {
    title: "Plus",
    description: <div className="description md:text-base font-normal leading-[18px] opacity-80">
                    For power users <span className='opacity-100 font-semibold'>branded links</span>, deeper analytics and higher limits.
                  </div>,
    price: "6.99",
    oldPrice: "USD 14.99 / month",
    everythingTitle: "Everything in Free and:",
    benefitsObject: [
      {
        Icon: Globe,
        title: "Custom domain",
        description: "One custom domain for branded links",
      },
      {
        Icon: BarChart2,
        title: "Advanced analytics",
        description: "UTM support, segmented reports & CSV export",
      },
      {
        Icon: Zap,
        title: "Integrations",
        description: "Connect to Zapier & webhooks",
      },
      {
        Icon: Code,
        title: "API access",
        description: "API keys & developer tools (rate-limited)",
      },
      {
        Icon: LifeBuoy,
        title: "Priority support",
        description: "Faster email support response times",
      },
    ],
    isFreePlan: false,
  },
  {
    title: "Pro",
    description: <div className="description md:text-base font-normal leading-[18px] opacity-80">
                    For businesses & teams <span className='opacity-100 font-semibold'>unlimited links</span>, API access and priority support.
                  </div>,
    price: "19.99",
    oldPrice: "USD 41.99 / month",
    everythingTitle: "Everything in Plus and:",
    benefitsObject: [
      {
        Icon: Key,
        title: "Developer API",
        description: "API keys, SDKs and unlimited requests",
      },
      {
        Icon: Users,
        title: "Teams",
        description: "Multiple seats, roles & SSO",
      },
      {
        Icon: Server,
        title: "Enterprise features",
        description: "A/B testing, deep analytics & SSO",
      },
      {
        Icon: ShieldCheck,
        title: "SLA & security",
        description: "Uptime guarantee & advanced security",
      },
      {
        Icon: Rocket,
        title: "Onboarding",
        description: "Dedicated onboarding & training sessions",
      },
    ],
    isFreePlan: false,
  },
]

const Pricing = () => {
  return (
    <section className='mb-24'>
        <div className='flex flex-col gap-14 items-center'>
            <div className='text-center font-sans text-xl md:text-5xl font-semibold'>
                Plans
            </div>
            <div className='flex flex-wrap justify-center items-center gap-4'>
              {cardContent.map((card, index) => (
                <CustomPlanCard key={index} {...card}/>
              ))}
            </div>
        </div>
    </section>
  )
}

export default Pricing