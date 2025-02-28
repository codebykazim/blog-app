import React, {useId} from 'react'

const Input = React.forwardRef(function Input(
    {
        label,
        type = 'text',
        className = '',
        error,
        ...props
    }, ref) {

    const id = useId();

    return (
        <div className="mb-4">
            {label && (
                <label
                    htmlFor={id}
                    className="block mb-1.5 text-sm font-medium text-[#335145]"
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`w-full px-4 py-2.5 bg-white border border-[#828C51]
                rounded-lg transition-all duration-200
                placeholder:text-[#828C51]
                focus:outline-none focus:ring-2 focus:ring-[#828C51] focus:border-[#828C51]
                hover:border-[#A6C36F]
                text-[#335145] ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
            {error && (
                <p className="mt-1.5 text-sm text-red-500">{error}</p>
            )}
        </div>
    )
})

export default Input