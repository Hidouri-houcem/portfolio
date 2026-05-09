import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HackerIntro from './components/HackerIntro'
import Navbar from './components/Navbar'
import NavigationArrows from './components/NavigationArrows'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'

import Contact from './components/Contact'
import BackgroundParticles from './components/BackgroundParticles'

function App() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-dark-950 overflow-x-hidden">
      <BackgroundParticles />
      
      <AnimatePresence mode="wait">
        {showIntro ? (
          <HackerIntro key="intro" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navbar />
            <NavigationArrows />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
             
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
