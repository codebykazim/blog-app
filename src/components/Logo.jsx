import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div
      className="font-bold text-2xl bg-gradient-to-r from-[#335145] to-[#828C51]
      bg-clip-text text-transparent tracking-tight hover:scale-105 transition-transform duration-200"
      style={{width}}
    >
      BlogApp
    </div>
  )
}

export default Logo