import Link from 'next/link';
import React from 'react'
import ButtonContent from './ButtonContent';

interface Props {
    title: string;
    wfull?: string;
    redirectedRoute?: string;
}

const Button = ({title, wfull="px-8", redirectedRoute}: Props) => {
  return (
    <>
      {redirectedRoute ? 
        <Link href={redirectedRoute}>
          <ButtonContent title={title} wfull={wfull}/>
        </Link> :
        <ButtonContent title={title} wfull={wfull}/>
      }

    </>
  )
}

export default Button