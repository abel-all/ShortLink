"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const handleClick = () => {
    theme === "light" ? setTheme("dark") : setTheme("light")
  }

  return (
    <Button onClick={handleClick} className="cursor-pointer" variant="custom" size="lg">
      <Sun className="h-[2rem] w-[2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-7 w-7 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  )
}