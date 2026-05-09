import { motion } from 'framer-motion'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { useState, useEffect } from 'react'

const NavigationArrows = () => {
  const [currentSection, setCurrentSection] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const sections = [
    { id: 'hero', name: 'Hero' },
    { id: 'about', name: 'About' },
    { id: 'skills', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'timeline', name: 'Timeline' },
    { id: 'contact', name: 'Contact' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition < 100) // Hide when scrolled down
      
      // Update current section based on scroll position
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      )
      
      for (let i = 0; i < sectionElements.length; i++) {
        const element = sectionElements[i]
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setCurrentSection(i)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigateToSection = (direction: 'front' | 'back') => {
    let newIndex = currentSection
    
    if (direction === 'front') {
      newIndex = Math.min(currentSection + 1, sections.length - 1)
    } else {
      newIndex = Math.max(currentSection - 1, 0)
    }
    
    const targetSection = document.getElementById(sections[newIndex].id)
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' })
      setCurrentSection(newIndex)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      navigateToSection('back')
    } else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      navigateToSection('front')
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSection])

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : 50
      }}
      transition={{ duration: 0.3 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
    >
      {/* Back Button */}
      <motion.button
        onClick={() => navigateToSection('back')}
        disabled={currentSection === 0}
        className="glass-card p-3 rounded-full hover-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Previous Section (↑)"
      >
        <FaChevronUp className="text-neon-cyan text-xl" />
      </motion.button>

      {/* Front Button */}
      <motion.button
        onClick={() => navigateToSection('front')}
        disabled={currentSection === sections.length - 1}
        className="glass-card p-3 rounded-full hover-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Next Section (↓)"
      >
        <FaChevronDown className="text-neon-cyan text-xl" />
      </motion.button>

      {/* Section Indicator */}
      <motion.div
        key={currentSection}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="glass-card px-4 py-2 rounded-lg text-center"
      >
        <div className="text-neon-cyan text-xs font-semibold">
          {sections[currentSection]?.name}
        </div>
        <div className="text-gray-400 text-xs mt-1">
          {currentSection + 1} / {sections.length}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default NavigationArrows
