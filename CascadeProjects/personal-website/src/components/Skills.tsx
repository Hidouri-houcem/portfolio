import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { 
  FaReact, FaNodeJs, FaPython, FaGitAlt, 
  FaDatabase, FaJs, FaLinux, 
  FaJava,
  FaBootstrap,
  FaNetworkWired
} from 'react-icons/fa'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set())

  const skills = [
    { name: 'React', icon: <FaReact />, level: 75, color: 'from-cyan-400 to-blue-500' },
    { name: 'Node.js', icon: <FaNodeJs />, level: 75, color: 'from-green-400 to-green-600' },
    { name: 'TypeScript', icon: <FaJs />, level: 80, color: 'from-blue-400 to-blue-600' },
    { name: 'Python', icon: <FaPython />, level: 50, color: 'from-yellow-400 to-blue-500' },
    { name: 'Java', icon: <FaJava />, level: 60, color: 'from-blue-400 to-blue-600' },
    { name: 'Git', icon: <FaGitAlt />, level: 88, color: 'from-orange-400 to-red-500' },
    { name: 'Tailwind CSS/Bootstrap', icon: <FaBootstrap />, level: 80, color: 'from-orange-400 to-yellow-500' },
    { name: 'MongoDB', icon: <FaDatabase />, level: 82, color: 'from-purple-400 to-pink-500' },
    { name: 'Networking', icon: <FaNetworkWired/>, level: 80, color: 'from-orange-500 to-blue-500' },
    { name: 'Linux', icon: <FaLinux />, level: 78, color: 'from-gray-400 to-gray-600' }

  ]

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setAnimatedSkills(new Set(skills.map(skill => skill.name)))
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [inView])

  return (
    <section id="skills" className="section-padding relative">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="neon-text">Technical Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 hover-glow"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl text-neon-cyan">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                </div>
                <span className="text-neon-cyan font-bold">{skill.level}%</span>
              </div>
              
              <div className="relative">
                <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
                    initial={{ width: 0 }}
                    animate={{ 
                      width: animatedSkills.has(skill.name) ? `${skill.level}%` : '0%' 
                    }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16"
        >
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6 text-center neon-text">Additional Expertise</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-3">🌐</div>
                <h4 className="text-lg font-semibold text-white mb-2">Network Architecture</h4>
                <p className="text-gray-400 text-sm">TCP/IP, Routing, Switching, Firewalls</p>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-3">🔒</div>
                <h4 className="text-lg font-semibold text-white mb-2">Cybersecurity</h4>
                <p className="text-gray-400 text-sm">Security Protocols, Best Practices</p>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-3">☁️</div>
                <h4 className="text-lg font-semibold text-white mb-2">Cloud Services</h4>
                <p className="text-gray-400 text-sm">AWS, Azure, DevOps Practices</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
