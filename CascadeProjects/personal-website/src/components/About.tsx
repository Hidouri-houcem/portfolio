import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGraduationCap, FaCode, FaNetworkWired, FaLightbulb } from 'react-icons/fa'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const highlights = [
    {
      icon: <FaGraduationCap className="text-3xl" />,
      title: "Education Focus",
      description: "Passionate about continuous learning and professional growth in IT and systems integration"
    },
    {
      icon: <FaCode className="text-3xl" />,
      title: "Full Stack Development",
      description: "Proficient in modern full-stack development with a focus on scalable web applications and best practices."
    },
    {
      icon: <FaNetworkWired className="text-3xl" />,
      title: "Network Engineering",
      description: "Strong foundation in network architecture, security, and infrastructure management."
    },
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: "Problem Solver",
      description: "Driven to solve complex technical challenges with innovative and efficient solutions."
    }
  ]

  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="neon-text">About Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 neon-text">Professional Journey</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
I am Houssem Hidouri, a passionate Full Stack Developer and Network Engineer with a strong foundation 
in both software development and network infrastructure. My journey in technology is driven by curiosity
and a continuous desire to build innovative and impactful solutions.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
I specialize in building modern and scalable web applications using the MERN stack (MongoDB, Express, React, Node.js), 
while also designing and managing network infrastructure and monitoring solutions in Linux environments. Through my academic background, bootcamp training, and hands-on projects, 
I have developed strong skills in web development, system administration, and network supervision.
              </p>
              <p className="text-gray-300 leading-relaxed">
I enjoy solving real-world problems by bridging software engineering with IT infrastructure expertise. 
I believe in clean code, scalable architecture, and effective problem-solving, 
and I approach every project with dedication, precision, and attention to detail.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 text-center hover-glow cursor-default"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-neon-cyan mb-3 flex justify-center">
                  {highlight.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">{highlight.title}</h4>
                <p className="text-gray-400 text-sm">{highlight.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>


      </div>
    </section>
  )
}

export default About
