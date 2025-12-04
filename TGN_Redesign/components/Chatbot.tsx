'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles, Minimize2, Zap, Heart, Star } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function Chatbot() {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm the Gypsy Nurse Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('job') || lowerMessage.includes('position')) {
      return "I can help you find travel nursing jobs! We have thousands of positions available across the country. Would you like to search by location, specialty, or pay rate?"
    } else if (lowerMessage.includes('login') || lowerMessage.includes('account')) {
      return "You can log in using the 'Log in' button in the navigation bar. We have separate login options for job seekers, agencies, recruiters, and admins."
    } else if (lowerMessage.includes('register') || lowerMessage.includes('sign up')) {
      return "To create an account, click the 'Join Gypsy Nurse' button in the navigation. Registration is free and gives you access to exclusive job listings and resources!"
    } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return "I'm here to help! You can ask me about jobs, registration, resources, events, or anything related to travel nursing. What would you like to know?"
    } else if (lowerMessage.includes('resource') || lowerMessage.includes('guide')) {
      return "We offer comprehensive resources including travel nurse guides, continuing education, housing assistance, and mentorship programs. Check out our Resources section for more!"
    } else if (lowerMessage.includes('event')) {
      return "We host various events throughout the year, including TravCon - the largest travel nursing conference! Visit our Events section to see what's coming up."
    } else {
      return "Thanks for your message! For more specific assistance, you can browse our resources, search for jobs, or contact our support team directly. How else can I help you?"
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Particles around button - Responsive */}
      <AnimatePresence>
        {!isOpen && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, Math.cos(i * 72 * Math.PI / 180) * 50, 0],
                  y: [0, Math.sin(i * 72 * Math.PI / 180) * 50, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeInOut"
                }}
                className={`fixed w-2 h-2 bg-primary-400 rounded-full blur-sm ${
                  isMobile ? 'bottom-24 right-8 z-[9997]' : 'bottom-10 right-10 z-40'
                }`}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Chatbot Toggle Button - Ultra Premium & Responsive */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className={`fixed ${
              isMobile ? 'bottom-20 right-4 z-[9998]' : 'bottom-6 right-6 z-50'
            }`}
          >
            {/* Outer Glow Ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: 'radial-gradient(circle, rgba(127, 40, 96, 0.4) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            {/* Middle Ring */}
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-primary-400/30"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.15, rotate: 15 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => setIsOpen(true)}
                className="relative p-5 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white rounded-full shadow-2xl group overflow-hidden"
              >
                {/* Animated Gradient Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Sparkle Effects */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: `${20 + i * 20}%`,
                      left: `${20 + i * 20}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.7,
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                  </motion.div>
                ))}
                
                {/* Icon with Advanced Animation */}
                <motion.div
                  className="relative z-10"
                  animate={{
                    y: [0, -3, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <MessageCircle className="w-8 h-8" strokeWidth={2.5} />
                </motion.div>

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    background: [
                      'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                      'linear-gradient(225deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.button>

              {/* Notification Badge with Pulse - Outside button */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  scale: {
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="absolute -top-1 -right-1 z-30"
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-red-500 rounded-full blur-md"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                  <div className="relative w-7 h-7 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-2 border-white flex items-center justify-center shadow-xl">
                    <motion.span
                      className="text-xs font-bold text-white"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      1
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Window - Ultra Premium Design & Responsive */}
      {mounted && isOpen && (
        isMobile && typeof document !== 'undefined' ? createPortal(
          <AnimatePresence>
            <motion.div
            initial={{ 
              opacity: 0, 
              y: isMobile ? '100%' : 100, 
              scale: isMobile ? 1 : 0.3, 
              rotateX: isMobile ? 0 : -15 
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              rotateX: 0
            }}
            exit={{ 
              opacity: 0, 
              y: isMobile ? '100%' : 100, 
              scale: isMobile ? 1 : 0.3, 
              rotateX: isMobile ? 0 : 15 
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`fixed ${
              isMobile 
                ? 'left-0 right-0 bottom-0 w-full' 
                : 'bottom-4 right-4 left-auto w-[420px] max-w-[calc(100vw-2rem)]'
            }`}
            style={{ 
              perspective: '1000px',
              maxHeight: isMinimized ? 'auto' : (isMobile ? 'calc(100vh - 4rem)' : 'calc(100vh - 5rem)'),
              zIndex: isMobile ? 10001 : 101,
              ...(isMobile && { 
                top: 'auto',
                bottom: '0',
                left: '0',
                right: '0',
                width: '100%',
                position: 'fixed'
              })
            }}
          >
            {/* Outer Glow */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-br from-primary-500/30 via-primary-400/20 to-primary-600/30 rounded-3xl blur-2xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Main Card with Glassmorphism */}
            <div className={`relative bg-white/95 backdrop-blur-2xl shadow-2xl overflow-hidden border border-white/60 ${
              isMobile ? 'rounded-t-3xl' : 'rounded-3xl'
            }`}>
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 p-[2px] bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 opacity-20 ${
                isMobile ? 'rounded-t-3xl' : 'rounded-3xl'
              }`} />
              
              {/* Animated Background Pattern */}
              <motion.div
                className="absolute inset-0 opacity-5"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: 'radial-gradient(circle, #7f2860 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}
              />
            {/* Header */}
            <motion.div
              className="relative bg-gradient-to-r from-primary-600 to-primary-500 p-3 sm:p-4 text-white overflow-hidden"
              whileHover={{ backgroundPosition: '100% 50%' }}
              style={{ backgroundSize: '200% 100%' }}
            >
              {/* Animated Background Pattern */}
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {/* Bot Avatar with Animation */}
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-white/30 rounded-full blur-md" />
                    <div className="relative bg-white/20 backdrop-blur-sm p-2 rounded-full border border-white/30">
                      <Bot className="w-5 h-5" />
                    </div>
                  </motion.div>
                  
                  <div>
                    <h3 className="font-bold text-base sm:text-lg flex items-center gap-1.5 sm:gap-2">
                      <span className="hidden sm:inline">Gypsy Nurse Assistant</span>
                      <span className="sm:hidden">GN Assistant</span>
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </h3>
                    <motion.p
                      className="text-xs text-white/80"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Online • Ready to help
                    </motion.p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Minimize Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </motion.button>

                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Chat Messages */}
            {!isMinimized && (
              <>
                <div className={`overflow-y-auto space-y-3 sm:space-y-4 bg-gradient-to-b from-gray-50 to-white p-3 sm:p-4 ${
                  isMobile ? 'h-[calc(100vh-16rem)]' : 'h-80 md:h-96'
                }`}>
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-end space-x-1.5 sm:space-x-2 max-w-[85%] sm:max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          {/* Avatar */}
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                              message.sender === 'user'
                                ? 'bg-gradient-to-br from-primary-500 to-primary-600'
                                : 'bg-gradient-to-br from-gray-600 to-gray-700'
                            }`}
                          >
                            {message.sender === 'user' ? (
                              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                            ) : (
                              <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                            )}
                          </motion.div>

                          {/* Message Bubble */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className={`relative px-3 py-2 sm:px-4 sm:py-3 rounded-2xl ${
                              message.sender === 'user'
                                ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-br-sm'
                                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-md'
                            }`}
                          >
                            {message.sender === 'bot' && (
                              <motion.div
                                className="absolute -inset-0.5 bg-gradient-to-r from-primary-400/20 to-primary-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100"
                                transition={{ duration: 0.3 }}
                              />
                            )}
                            <p className="text-sm relative z-10">{message.text}</p>
                            <span className={`text-xs mt-1 block ${
                              message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-end space-x-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm shadow-md">
                        <div className="flex space-x-2">
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area with Glass Effect */}
                <div className="relative p-3 sm:p-4 border-t border-white/20 bg-gradient-to-br from-white/60 via-white/40 to-white/60 backdrop-blur-xl">
                  {/* Subtle animated background */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundImage: 'radial-gradient(circle, rgba(127, 40, 96, 0.1) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  />

                  <div className="relative flex items-end space-x-2">
                    <div className="flex-1 relative">
                      {/* Glass effect container for textarea */}
                      <motion.div
                        whileFocus={{ scale: 1.01 }}
                        className="relative bg-white/70 backdrop-blur-md border-2 border-white/60 rounded-2xl shadow-lg overflow-hidden group"
                      >
                        {/* Shine effect on focus */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-focus-within:opacity-100"
                          animate={{
                            x: ['-100%', '200%'],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        />
                        
                        <textarea
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your message..."
                          rows={1}
                          className="relative z-10 w-full px-4 py-3 bg-transparent resize-none outline-none text-gray-800 placeholder-gray-500 text-sm"
                          style={{ maxHeight: '100px' }}
                        />
                      </motion.div>
                    </div>

                    {/* Glass effect send button */}
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="relative p-2.5 sm:p-3 bg-gradient-to-br from-white/80 to-white/70 backdrop-blur-sm border-2 border-primary-200/50 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group hover:border-primary-400 transition-all duration-300"
                    >
                      {/* Gradient overlay on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      
                      {/* Shine effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Sparkle effect on hover */}
                      <motion.div
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0, rotate: 0 }}
                        whileHover={{
                          scale: [0, 1, 0],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <Sparkles className="w-3 h-3 text-yellow-300" />
                      </motion.div>

                      <Send className="relative z-10 w-5 h-5 text-primary-600 group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
                    </motion.button>
                  </div>

                  {/* Quick Actions with Glass Effect */}
                  <div className="relative mt-3 flex flex-wrap gap-2">
                    {['Find Jobs', 'Resources', 'Events', 'Help'].map((action, index) => (
                      <motion.button
                        key={action}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setInputMessage(action)}
                        className="relative px-3 py-1.5 text-xs font-medium text-primary-700 bg-white/60 backdrop-blur-md border border-white/60 rounded-xl hover:bg-white/80 transition-all shadow-md overflow-hidden group"
                      >
                        {/* Shine effect on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.5 }}
                        />
                        <span className="relative z-10">{action}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </>
            )}
            </div>
          </motion.div>
          </AnimatePresence>
        , document.body) : (
          <AnimatePresence>
            <motion.div
            initial={{ 
              opacity: 0, 
              y: isMobile ? '100%' : 100, 
              scale: isMobile ? 1 : 0.3, 
              rotateX: isMobile ? 0 : -15 
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              rotateX: 0
            }}
            exit={{ 
              opacity: 0, 
              y: isMobile ? '100%' : 100, 
              scale: isMobile ? 1 : 0.3, 
              rotateX: isMobile ? 0 : 15 
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`fixed ${
              isMobile 
                ? 'left-0 right-0 bottom-0 w-full' 
                : 'bottom-4 right-4 left-auto w-[420px] max-w-[calc(100vw-2rem)]'
            }`}
            style={{ 
              perspective: '1000px',
              maxHeight: isMinimized ? 'auto' : (isMobile ? 'calc(100vh - 4rem)' : 'calc(100vh - 5rem)'),
              zIndex: isMobile ? 10001 : 101,
              ...(isMobile && { 
                top: 'auto',
                bottom: '0',
                left: '0',
                right: '0',
                width: '100%',
                position: 'fixed'
              })
            }}
          >
            {/* Outer Glow */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-br from-primary-500/30 via-primary-400/20 to-primary-600/30 rounded-3xl blur-2xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Main Card with Glassmorphism */}
            <div className={`relative bg-white/95 backdrop-blur-2xl shadow-2xl overflow-hidden border border-white/60 ${
              isMobile ? 'rounded-t-3xl' : 'rounded-3xl'
            }`}>
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 p-[2px] bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 opacity-20 ${
                isMobile ? 'rounded-t-3xl' : 'rounded-3xl'
              }`} />
              
              {/* Animated Background Pattern */}
              <motion.div
                className="absolute inset-0 opacity-5"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: 'radial-gradient(circle, #7f2860 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}
              />
            {/* Header */}
            <motion.div
              className="relative bg-gradient-to-r from-primary-600 to-primary-500 p-3 sm:p-4 text-white overflow-hidden"
              whileHover={{ backgroundPosition: '100% 50%' }}
              style={{ backgroundSize: '200% 100%' }}
            >
              {/* Animated Background Pattern */}
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {/* Bot Avatar with Animation */}
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-white/30 rounded-full blur-md" />
                    <div className="relative bg-white/20 backdrop-blur-sm p-2 rounded-full border border-white/30">
                      <Bot className="w-5 h-5" />
                    </div>
                  </motion.div>
                  
                  <div>
                    <h3 className="font-bold text-base sm:text-lg flex items-center gap-1.5 sm:gap-2">
                      <span className="hidden sm:inline">Gypsy Nurse Assistant</span>
                      <span className="sm:hidden">GN Assistant</span>
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </h3>
                    <motion.p
                      className="text-xs text-white/80"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Online • Ready to help
                    </motion.p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Minimize Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </motion.button>

                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Chat Messages */}
            {!isMinimized && (
              <>
                <div className={`overflow-y-auto space-y-3 sm:space-y-4 bg-gradient-to-b from-gray-50 to-white p-3 sm:p-4 ${
                  isMobile ? 'h-[calc(100vh-16rem)]' : 'h-80 md:h-96'
                }`}>
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-end space-x-1.5 sm:space-x-2 max-w-[85%] sm:max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          {/* Avatar */}
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                              message.sender === 'user'
                                ? 'bg-gradient-to-br from-primary-500 to-primary-600'
                                : 'bg-gradient-to-br from-gray-600 to-gray-700'
                            }`}
                          >
                            {message.sender === 'user' ? (
                              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                            ) : (
                              <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                            )}
                          </motion.div>

                          {/* Message Bubble */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className={`relative px-3 py-2 sm:px-4 sm:py-3 rounded-2xl ${
                              message.sender === 'user'
                                ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-br-sm'
                                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-md'
                            }`}
                          >
                            {message.sender === 'bot' && (
                              <motion.div
                                className="absolute -inset-0.5 bg-gradient-to-r from-primary-400/20 to-primary-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100"
                                transition={{ duration: 0.3 }}
                              />
                            )}
                            <p className="text-sm relative z-10">{message.text}</p>
                            <span className={`text-xs mt-1 block ${
                              message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-end space-x-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm shadow-md">
                        <div className="flex space-x-2">
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area with Glass Effect */}
                <div className="relative p-3 sm:p-4 border-t border-white/20 bg-gradient-to-br from-white/60 via-white/40 to-white/60 backdrop-blur-xl">
                  {/* Subtle animated background */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundImage: 'radial-gradient(circle, rgba(127, 40, 96, 0.1) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  />

                  <div className="relative flex items-end space-x-2">
                    <div className="flex-1 relative">
                      {/* Glass effect container for textarea */}
                      <motion.div
                        whileFocus={{ scale: 1.01 }}
                        className="relative bg-white/70 backdrop-blur-md border-2 border-white/60 rounded-2xl shadow-lg overflow-hidden group"
                      >
                        {/* Shine effect on focus */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-focus-within:opacity-100"
                          animate={{
                            x: ['-100%', '200%'],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        />
                        
                        <textarea
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your message..."
                          rows={1}
                          className="relative z-10 w-full px-4 py-3 bg-transparent resize-none outline-none text-gray-800 placeholder-gray-500 text-sm"
                          style={{ maxHeight: '100px' }}
                        />
                      </motion.div>
                    </div>

                    {/* Glass effect send button */}
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="relative p-2.5 sm:p-3 bg-gradient-to-br from-white/80 to-white/70 backdrop-blur-sm border-2 border-primary-200/50 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group hover:border-primary-400 transition-all duration-300"
                    >
                      {/* Gradient overlay on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      
                      {/* Shine effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Sparkle effect on hover */}
                      <motion.div
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0, rotate: 0 }}
                        whileHover={{
                          scale: [0, 1, 0],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <Sparkles className="w-3 h-3 text-yellow-300" />
                      </motion.div>

                      <Send className="relative z-10 w-5 h-5 text-primary-600 group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
                    </motion.button>
                  </div>

                  {/* Quick Actions with Glass Effect */}
                  <div className="relative mt-3 flex flex-wrap gap-2">
                    {['Find Jobs', 'Resources', 'Events', 'Help'].map((action, index) => (
                      <motion.button
                        key={action}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setInputMessage(action)}
                        className="relative px-3 py-1.5 text-xs font-medium text-primary-700 bg-white/60 backdrop-blur-md border border-white/60 rounded-xl hover:bg-white/80 transition-all shadow-md overflow-hidden group"
                      >
                        {/* Shine effect on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.5 }}
                        />
                        <span className="relative z-10">{action}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </>
            )}
            </div>
          </motion.div>
          </AnimatePresence>
        )
      )}
    </>
  )
}

