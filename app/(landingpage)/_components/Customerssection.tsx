import React from 'react'

const cardContent = [
  {
    description: "“Lorem ipsum is placeholder text used in design.”",
    image: "A",
    name: "Abdessamad",
    title: "Software Eng",
    delay: "delay-[calc(50s/7*(7-1)*-1)]",
  },
  {
    description: "“Lorem ipsum is placeholder text used in design.”",
    image: "A",
    name: "Abdessamad",
    title: "Software Eng",
    delay: "delay-[calc(50s/7*(7-2)*-1)]",
  },
  {
    description: "“Lorem ipsum is placeholder text used in design.”",
    image: "A",
    name: "Abdessamad",
    title: "Software Eng",
    delay: "delay-[calc(50s/7*(7-3)*-1)]",
  },
  {
    description: "“Lorem ipsum is placeholder text used in design.”",
    image: "A",
    name: "Abdessamad",
    title: "Software Eng",
    delay: "delay-[calc(50s/7*(7-4)*-1)]",
  },
  {
    description: "“Lorem ipsum is placeholder text used in design.”",
    image: "A",
    name: "Abdessamad",
    title: "Software Eng",
    delay: "delay-[calc(50s/7*(7-5)*-1)]",
  },
  {
    description: "“Lorem ipsum is placeholder text used in design.”",
    image: "A",
    name: "Abdessamad",
    title: "Software Eng",
    delay: "delay-[calc(50s/7*(7-6)*-1)]",
  },
  {
    description: "“Lorem ipsum is placeholder text used in design.”",
    image: "A",
    name: "Abdessamad",
    title: "Software Eng",
    delay: "delay-[calc(50s/7*(7-7)*-1)]",
  },
]

const Customerssection = () => {
  return (
    <section className='flex flex-col gap-14 items-center'>
        <div className='text-center text-xl md:text-5xl font-semibold'>
            What people are saying
        </div>
        <div className='wrapper'>
          {cardContent.map(({description, image, name, title, delay}, index) => (
            <div key={index} className={`marqueecard ${delay} rounded-4xl p-6 flex flex-col justify-between w-[20rem] h-[21rem] border border-[var(--border-color-white)] dark:border-[var(--border-color-dark)]`}>
              <div className='md:text-2xl opacity-70'>
                {description}
              </div>
              <div className='flex items-center gap-8'>
                <div className={`flex justify-center items-center text-2xl w-[60px] md:w-[80px] h-[60px] md:h-[80px] bg-[var(--border-color-white)] dark:bg-[var(--border-color-dark)] rounded-full`}>
                  {image}
                </div>
                <div className='flex flex-col items-center justify-center gap-1 leading-6'>
                  <div className='max-md:text-sm font-semibold '>{name}</div>
                  <div className='max-md:text-sm opacity-80'>{title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  )
}

export default Customerssection