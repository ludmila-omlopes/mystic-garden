'use client'

import * as React from "react"
import { Moon, Sun, Heart } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { theme, setTheme } = useTheme() // Access the current theme

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {/* Sun Icon (Light Mode) */}
          <Sun className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-${theme === 'light' ? '100' : '0'} transition-all`} />
          
          {/* Moon Icon (Dark Mode) */}
          <Moon className={`absolute h-[1.2rem] w-[1.2rem] rotate-${theme === 'dark' ? '0' : '90'} scale-${theme === 'dark' ? '100' : '0'} transition-all`} />
          
          {/* Heart Icon (Girly Mode) 
          <Heart className={`absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-${theme === 'girly' ? '100' : '0'} transition-all`} /> */}
          
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
       {  /* <DropdownMenuItem onClick={() => setTheme("girly")}>
          Girly 💅
        </DropdownMenuItem> */ }
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
