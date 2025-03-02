function Button({
  children,
  type = "button",
  textColor = "text-white",
  bgColor = "bg-purple-500",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-5 py-2.5 rounded-full font-medium inline-flex items-center justify-center
        ${bgColor} ${textColor} hover:opacity-90 active:scale-[0.98] disabled:opacity-50
        disabled:cursor-not-allowed transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
        shadow-sm hover:shadow-md ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button