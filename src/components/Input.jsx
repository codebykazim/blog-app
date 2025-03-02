import React, { useId } from "react"

const Input = React.forwardRef(function Input({ label, type = "text", className = "", error, ...props }, ref) {
  const id = useId()

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block mb-1.5 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-4 py-2.5 bg-white border border-gray-200
                rounded-lg transition-all duration-200
                placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                hover:border-purple-400
                text-gray-900 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
})

export default Input