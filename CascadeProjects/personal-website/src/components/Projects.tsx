import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaDatabase, FaServer, FaLinux, FaNetworkWired } from 'react-icons/fa'
import lmsImage from '../assets/lms-platform.png'
import monitoringImage from '../assets/Monitoring.PNG'
import portfolioImage from '../assets/Portfolio .png'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [pressedProject, setPressedProject] = useState<string | null>(null)

  const projects = [
    {
      id: '1',
      title: 'LMS Platform (Learning Management System)',
      description: 'Full-stack LMS web application allowing users to browse courses, register, authenticate securely, and complete online payments using Stripe.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB','Clerk', 'Stripe'],
      icons: [<FaReact />, <FaNodeJs />,, <FaDatabase />],
      github: 'https://github.com/Hidouri-houcem/LMS-Platform-',
      demo: 'https://lms-frontend-umber-three.vercel.app/',
      image: <img src={lmsImage} alt="LMS Platform" className="w-full h-full object-cover rounded-t-2xl" />
    },
    {
      id: '2',
      title: 'Network Monitoring Tool',
      description: 'Designed and implemented a network monitoring system using Nagios and Grafana to track infrastructure performance, detect issues in real time, and visualize metrics through interactive dashboards. The system ensures high availability and proactive incident management.',
      technologies: ['Nagios', 'Grafana', 'Linux', 'Networking' , 'Monitoring'],
      icons: [<FaServer /> , <FaLinux />, <FaNetworkWired />],
      github: 'https://github.com/Hidouri-houcem/Monitoring-',
      demo: '',
      image: <img src={monitoringImage} alt="Network Monitoring Tool" className="w-full h-full object-cover rounded-t-2xl" />
    },
    {
      id: '3',
      title: 'Personal Developer Portfolio',
      description: 'Modern interactive portfolio built with React and Vite, featuring 3D animations, hacker-style intro, and responsive design.',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      icons: [<FaReact />],
      github: 'https://github.com/houss-task-manager',
      demo: 'https://task-manager-demo.com',
      image: <img src={portfolioImage} alt="Personal Developer Portfolio" className="w-full h-full object-cover rounded-t-2xl" />
    }
  ]

  return (
    <section id="projects" className="section-padding relative">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="neon-text">Featured Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onMouseDown={() => setPressedProject(project.id)}
              onMouseUp={() => setPressedProject(null)}
              onTouchStart={() => setPressedProject(project.id)}
              onTouchEnd={() => setPressedProject(null)}
              style={{
                perspective: '1000px'
              }}
            >
              <motion.div
                className="glass-card h-full hover-glow cursor-pointer relative overflow-hidden"
                animate={{
                  rotateX: hoveredProject === project.id ? -5 : 0,
                  rotateY: hoveredProject === project.id ? 5 : 0,
                  scale: pressedProject === project.id ? 1.1 : (hoveredProject === project.id ? 1.05 : 1)
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut"
                }}
                style={{
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Project Image/Icon */}
                <div className={`relative flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-700 rounded-t-2xl overflow-hidden ${project.id === '1' ? 'h-64' : 'h-48'}`}>
                  <motion.div
                    className={`${project.id === '1' ? 'text-7xl' : 'text-6xl'} ${project.id === '1' ? 'z-10' : ''}`}
                    animate={{
                      rotate: hoveredProject === project.id ? 360 : 0,
                      scale: pressedProject === project.id ? 1.3 : (hoveredProject === project.id ? 1.2 : 1)
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    {project.image}
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent opacity-60"></div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 neon-text">{project.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-dark-800 rounded-full text-xs text-neon-cyan border border-neon-cyan/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Icons */}
                  <div className="flex gap-3 mb-4">
                    {project.icons.map((icon, iconIndex) => (
                      <div key={iconIndex} className="text-neon-cyan text-xl">
                        {icon}
                      </div>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaGithub />
                      <span className="text-sm">Code</span>
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaExternalLinkAlt />
                      <span className="text-sm">Demo</span>
                    </motion.a>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-neon-cyan/10 to-transparent pointer-events-none rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/Hidouri-houcem"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 glass px-6 py-3 rounded-lg hover-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub />
            <span>View More Projects on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
