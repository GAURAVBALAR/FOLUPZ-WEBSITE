import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, className = '', range = 45, ...props }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    
    // Center point of the button
    const centerX = left + width / 2
    const centerY = top + height / 2

    // Distance between mouse and button center
    const distanceX = clientX - centerX
    const distanceY = clientY - centerY

    // Pull button towards mouse relative to distance
    setPosition({
      x: distanceX * 0.35,
      y: distanceY * 0.35
    })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.2
      }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
