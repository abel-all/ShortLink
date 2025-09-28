import React from 'react'

interface Props {
   currentStep: number;
   title: string;
   link: string;
}

const SignLink = ({currentStep, title, link}: Props) => {
  return (
    <>
        {currentStep === 0 && <div className="text-base font-medium mt-8 px-2 opacity-80">
            {title}{' '}
        <a href={link} className="text-[var(--second-color)] hover:text-[var(--main-color)] transition-all duration-300">
            {link === "/signup" ? "Sign up" : "Sign in"}
        </a>
        </div>}
    </>
  )
}

export default SignLink