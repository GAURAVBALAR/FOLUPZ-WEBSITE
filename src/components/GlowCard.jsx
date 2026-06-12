import { useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function GlowCard({ children, className = '', glowColor = 'rgba(114, 101, 213, 0.15)', ...props }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 200 }
  const glowX = useSpring(mouseX, springConfig)
  const glowY = useSpring(mouseY, springConfig)

  const [hovering, setHovering] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#c9c4d5] bg-white transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      {...props}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute pointer-events-none rounded-full blur-[100px]"
        style={{
          width: 300,
          height: 300,
          background: glowColor,
          x: glowX.get() - 150,
          y: glowY.get() - 150,
          left: 0,
          top: 0,
        }}
        animate={{
          opacity: hovering ? 1 : 0,
          x: glowX,
          y: glowY,
        }}
        transition={{ opacity: { duration: 0.3 } }}
      />
      {/* Content wrapper */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  )
}
