import React from 'react'

interface Props {
    currentStep: number;
    nbrOfSteps: number;
}

const ProgressNumbers = ({currentStep, nbrOfSteps} : Props) => {
  return (
    <div className="mb-8 flex items-center justify-between relative">
        {Array.from({ length: nbrOfSteps }, (_, index) => (
            <div key={index} className="flex items-center w-full">
              {/* Step circle */}
              <div 
                className={`transition-all duration-500 ease-out flex-shrink-0 w-14 h-14 rounded-full border-2 flex items-center justify-center font-medium text-2xl ${
                  index < currentStep 
                    ? "border-green-600 text-black dark:text-white"
                    : "border-[var(--border-color-white)] text-black dark:text-white"
                }`}
              >
                {index + 1}
              </div>
              {index < nbrOfSteps - 1 && (
                <div 
                  className={`flex-1 h-0.5 transition-all duration-500 ease-out ${
                    index < currentStep 
                      ? "bg-green-600"
                      : "bg-[var(--border-color-white)] dark:[var(--border-color-dark)]"
                  }`}
                />
              )}
            </div>
          ))}
    </div>
  )
}

export default ProgressNumbers