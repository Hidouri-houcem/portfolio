import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const HackerIntro = () => {
  const [text, setText] = useState('')
  const [showAccess, setShowAccess] = useState(false)
  
  const fullText = '> Initializing portfolio system...\n> Loading user credentials...\n> Authenticating Houssem Hidouri...\n> Access granted.\n> Welcome to the matrix.'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
        setTimeout(() => setShowAccess(true), 500)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="terminal-text text-lg md:text-xl lg:text-2xl font-mono p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-[200px]"
        >
          {text.split('\n').map((line, index) => (
            <div key={index} className="mb-2">
              {line}
              {index === text.split('\n').length - 1 && !showAccess && (
                <span className="animate-pulse">_</span>
              )}
            </div>
          ))}
        </motion.div>
        
        {showAccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-8"
          >
            <div className="text-neon-cyan text-3xl md:text-4xl font-bold mb-4">
              SYSTEM READY
            </div>
            <div className="text-neon-green animate-pulse">
              &gt; Loading portfolio...
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default HackerIntro
