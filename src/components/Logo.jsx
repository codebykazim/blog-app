function Logo({ width = "100px" }) {
  return (
    <div
      className="font-bold text-2xl bg-gradient-to-r from-purple-500 to-blue-600
      bg-clip-text text-transparent tracking-tight hover:scale-105 transition-transform duration-200"
      style={{ width }}
    >
      HEXA BLOG
    </div>
  )
}

export default Logo