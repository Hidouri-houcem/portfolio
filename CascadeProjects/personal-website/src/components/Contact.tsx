import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import axios from 'axios'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await axios.post('/api/contact', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      })

      if (response.data.success) {
        setSuccess(response.data.message)
        setIsSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setSuccess('')
        }, 5000)
      } else {
        setError(response.data.error || 'Failed to send message')
      }
    } catch (err: any) {
      console.error('Contact form error:', err)
      if (err.response) {
        // Server responded with error status
        setError(err.response.data.error || 'Server error occurred')
      } else if (err.request) {
        // Request was made but no response received
        setError('Network error. Please check your connection and try again.')
      } else {
        // Something else happened
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'houssem.hidouri057@gmail.com',
      href: 'mailto:houssem.hidouri057@gmail.com'
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '+216 97 089 122',
      href: 'tel:+21697089122'
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'Tunisia',
      href: '#'
    }
  ]

  const socialLinks = [
    {
      icon: <FaGithub />,
      label: 'GitHub',
      href: 'https://github.com/Hidouri-houcem'
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/hidouri-houcem'
    }

  ]

  return (
    <section id="contact" className="section-padding relative">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="neon-text">Get In Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card p-8 h-full">
              <h3 className="text-2xl font-bold mb-6 neon-text">Let's Connect</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I'm always interested in hearing about new opportunities, exciting projects, 
                or just having a chat about technology. Feel free to reach out!
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 p-3 glass rounded-lg hover-glow transition-all duration-300 group"
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-2xl text-neon-cyan group-hover:scale-110 transition-transform">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{info.label}</div>
                      <div className="text-white font-medium">{info.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Follow Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 glass rounded-lg flex items-center justify-center text-neon-cyan hover-glow transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      title={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 neon-text">Send a Message</h3>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">✅</div>
                  <h4 className="text-xl font-bold text-neon-green mb-2">Message Sent!</h4>
                  <p className="text-gray-300">{success || 'Thank you for reaching out. I\'ll get back to you soon!'}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">⚠️</span>
                        <span>{error}</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Success Message */}
                  {success && !isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">✅</span>
                        <span>{success}</span>
                      </div>
                    </motion.div>
                  )}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-800 border border-neon-cyan/30 rounded-lg focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan text-white transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-800 border border-neon-cyan/30 rounded-lg focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan text-white transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-dark-800 border border-neon-cyan/30 rounded-lg focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan text-white transition-all duration-300 resize-none"
                      placeholder="Your message here..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full glass px-6 py-3 rounded-lg hover-glow text-neon-cyan font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 neon-text">Open to Opportunities</h3>
            <p className="text-gray-300 leading-relaxed">
Full-stack developer and network engineering enthusiast, actively seeking opportunities to contribute 
to real-world projects, build scalable applications, and grow in a professional tech environment.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
