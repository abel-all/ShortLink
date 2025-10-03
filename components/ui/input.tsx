import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full px-4 border rounded-full h-12 placeholder-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 border-[var(--border-color-white)] dark:border-[var(--border-color-dark)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
