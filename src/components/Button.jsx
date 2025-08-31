function Button({ children, type = "button", variant = "primary", size = "md", className = "", ...props }) {
  const baseClasses =
    "font-semibold inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 shadow-sm hover:shadow-md",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500",
    outline: "border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white focus:ring-green-500",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
    destructive: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm hover:shadow-md",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-5 py-2.5 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} type={type} {...props}>
      {children}
    </button>
  )
}

export default Button
