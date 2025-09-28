import React from 'react'
import { SignupData } from '../signup/page';
import { SigninData } from '../signin/page';

interface SignData {
    field: keyof SignupData | keyof SigninData;
    placeholder: string;
    type: string;
    title: string;
    subtitle: string;
}

interface Props {
    signupSteps: SignData[];
    currentStep: number;
}

const FormContent = ({signupSteps, currentStep}: Props) => {
  return (
    <div className="space-y-2">
      <div className="text-5xl font-medium">
        {signupSteps[currentStep].title}
      </div>
      <div className="text-xl font-normal">
        {signupSteps[currentStep].subtitle}
      </div>
    </div>
  )
}

export default FormContent