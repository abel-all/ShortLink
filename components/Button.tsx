import Link from 'next/link';
import React from 'react'
import ButtonContent from './ButtonContent';

interface Props {
    title: string | React.ReactNode;
    wfull?: string;
    redirectedRoute?: string;
    disabled?: boolean;
    version?: string;
    textColor?: string;
}

const Button = ({title, wfull="px-8", redirectedRoute, disabled, version="default", textColor}: Props) => {
  
  switch (version) {
    case "redirect" :
      return <Link href={redirectedRoute ?? "/"}>
        <ButtonContent title={title} wfull={wfull} disabled={disabled}/>
      </Link>
    case "outline" :
      return <ButtonContent title={title} wfull={wfull} disabled={disabled} isOutlined={true}/>
    case "form" :
      return <ButtonContent type={"submit"} title={title} wfull={wfull} disabled={disabled}/>
    case "colored" :
      return <ButtonContent type={"submit"} title={title} wfull={wfull} disabled={disabled} textColor={textColor}/>
    default :
      return <ButtonContent title={title} wfull={wfull}/>
  }
}

export default Button