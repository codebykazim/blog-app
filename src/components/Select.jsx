import React, { useId } from "react"
import { ChevronDown } from "lucide-react"

function Select({ options, label, className, error, ...props }, ref) {
  const id = useId()

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block mb-1.5 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          {...props}
          id={id}
          ref={ref}
          className={`w-full px-4 py-2.5 bg-white border border-gray-200
                    rounded-lg appearance-none transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    hover:border-blue-400 cursor-pointer
                    text-gray-900 pr-10 ${className}`}
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default React.forwardRef(Select)

