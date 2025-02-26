'use client'

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DayPicker, DateRange } from "react-day-picker"
import "react-day-picker/dist/style.css"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date?: DateRange | undefined
  onSelect?: (date: DateRange | undefined) => void
}

export function DatePicker({ date, onSelect }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "relative z-[9999] w-[280px] justify-start text-left font-medium",
            "bg-white hover:bg-gray-900",
            "rounded-lg border border-gray-200",
            "text-sm",
            "shadow-sm transition-all",
            !date && "text-gray-600",
            "text-black hover:text-white"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 bg-white rounded-lg shadow-lg border border-gray-200" 
        align="start"
      >
        <DayPicker
          mode="range"
          selected={date}
          onSelect={onSelect}
          showOutsideDays
          className="p-3"
        //   hideNavigation 
        //   captionLayout="dropdown"
          formatters={{ formatWeekdayName: (weekday) => 
            <span className="text-black font-semibold">
              {weekday.toString().slice(0, 2)}
            </span>
          }}
          modifiersClassNames={{
            selected: "bg-gray-200 rounded-sm",
            range_start: "bg-gray-400 text-black font-medium",
            range_end: "bg-gray-400 text-black font-medium",
            range_middle: "bg-gray-100"
          }}
          
          classNames={{
            months: "flex space-x-4",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-xl font-medium text-gray-900",            
            // nav: "",
            nav_button: cn(
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-full",
              "text-gray-900 hover:bg-gray-100"
            ),
            // nav_button_previous: "absolute left-1",
            // nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-black rounded-md w-9 font-semibold text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
            day: cn(
              "h-9 w-9 p-0 font-normal text-gray-900",
              "hover:bg-gray-100"
            ),
            day_today: "font-semibold",
            day_outside: "text-gray-400 opacity-50",
            day_disabled: "text-gray-400 opacity-50",
            day_hidden: "invisible",
          }}
        />
      </PopoverContent>
    </Popover>
  )
} 