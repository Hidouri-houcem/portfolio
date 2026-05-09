import { motion } from 'framer-motion'
import { FaDownload, FaArrowDown } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const floatingElements = [
    { delay: 0, duration: 3, x: -100, y: -50 },
    { delay: 0.5, duration: 4, x: 100, y: -30 },
    { delay: 1, duration: 3.5, x: -50, y: 50 },
    { delay: 1.5, duration: 4.5, x: 80, y: 40 }
  ]

  const downloadCV = () => {
    // Create a sample PDF download
    const link = document.createElement('a')
    link.href = 'Hidouri_Houssem.pdf'
    link.download = 'Hidouri_Houssem.pdf'
    link.click()
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative section-padding">
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <span className="glass px-4 py-2 rounded-full text-neon-cyan text-sm">
                👋 Welcome to my digital space
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <span className="block text-white">Houssem</span>
              <span className="block neon-text">Hidouri</span>
            </motion.h1>

            <motion.div
              className="text-xl md:text-2xl mb-8 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              IT Specialist (Networks & Systems) | Full-Stack Developer
            </motion.div>

            <motion.p
              className="text-gray-400 mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
I design and build modern web applications using the MERN stack, and I 
also implement reliable network systems and infrastructure monitoring solutions.<br />
Passionate about clean architecture, performance, and real-world problem solving in both software and IT systems.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={downloadCV}
                className="glass px-6 py-3 rounded-lg hover-glow flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload />
                Download CV
              </motion.button>
              
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="neon-border px-6 py-3 rounded-lg text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right 3D Elements */}
          <motion.div
            className="relative h-96 md:h-full"
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Floating 3D Elements */}
            {floatingElements.map((element, index) => (
              <motion.div
                key={index}
                className="absolute glass-card neon-border"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  x: element.x,
                  y: element.y,
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: element.duration,
                  delay: element.delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 0,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">
                    {index === 0 && '💻'}
                    {index === 1 && '🌐'}
                    {index === 2 && '🔧'}
                    {index === 3 && '🚀'}
                  </div>
                  <div className="text-sm text-neon-cyan">
                    {index === 0 && 'Development'}
                    {index === 1 && 'Networking'}
                    {index === 2 && 'DevOps'}
                    {index === 3 && 'Innovation'}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Central 3D Card */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                perspective: '1000px'
              }}
            >
              <motion.div
                className="glass-card neon-border p-8 max-w-sm"
                animate={{
                  rotateY: [0, 5, -5, 0],
                  rotateX: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-float">👨‍💻</div>
                  <h3 className="text-xl font-bold neon-text mb-2">Ready to Code</h3>
                  <p className="text-gray-400 text-sm">
                    Transforming ideas into digital reality
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaArrowDown className="text-neon-cyan text-2xl" />
      </motion.div>
    </section>
  )
}

export default Hero
