import React from 'react'

function Button({
    children,
    type='button',
    textColor='text-white',
    className='',
    ...props
}) {
  return (
    <button className={`${textColor} ${className}`} {...props} >
        {children}
    </button>
  )
}

export default Button