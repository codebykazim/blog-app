import React, { useId } from "react"
import { ChevronDown } from "lucide-react"

function Select({ options, label, className, error, ...props }, ref) {
  const id = useId()

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block mb-1.5 text-sm font-medium text-[#335145]">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          {...props}
          id={id}
          ref={ref}
          className={`w-full px-4 py-2.5 bg-white border border-[#828C51]
                    rounded-lg appearance-none transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-[#828C51] focus:border-[#828C51]
                    hover:border-[#A6C36F] cursor-pointer
                    text-[#335145] pr-10 ${className}`}
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#828C51] pointer-events-none" />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default React.forwardRef(Select)