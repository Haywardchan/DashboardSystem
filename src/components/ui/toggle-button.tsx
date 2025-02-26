'use client'

import * as React from 'react'
import { cn } from "@/lib/utils"

interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  label?: string;
  icon?: React.ReactNode;
}

export function ToggleButton({ 
  isActive, 
  label, 
  icon,
  className,
  ...props 
}: ToggleButtonProps) {
  return (
    <button
      className={cn(
        "group relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
        "bg-white border border-gray-200",
        "hover:bg-gray-50",
        isActive && [
          "bg-gray-900 hover:bg-gray-800",
          "border-gray-900",
          "text-white"
        ],
        "focus:outline-none focus:ring-2 focus:ring-gray-200",
        className
      )}
      {...props}
    >
      {icon && (
        <span className={cn(
          "transition-transform duration-200",
          isActive && "transform scale-110",
          isActive ? "text-white" : "text-gray-700"
        )}>
          {icon}
        </span>
      )}
      {label && (
        <span className={cn(
          "transition-colors duration-200",
          isActive ? "text-white" : "text-gray-700"
        )}>
          {label}
        </span>
      )}
    </button>
  )
} 