import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import './App.css'

const stagger = {
  container: { visible: { transition: { staggerChildren: 0.08 } } },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function FloatingShape({ className, children, duration = 4, delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -18, 0] }}
      transition={{ repeat: Infinity, duration, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}

function RotatingRing({ className, size = 600 }) {
  return (
    <motion.div
      className={className}
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
    />
  )
}

function PulseRing({ className }) {
  return (
    <motion.div
      className={className}
      animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.7, 0, 0.7] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeOut' }}
    />
  )
}

function PhoneMockup() {
  return (
    <motion.div
      className="relative flex-shrink-0 flex flex-col items-center"
      style={{ width: 320, maxWidth: '100%' }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <motion.div
        className="relative z-10 bg-surface-container-lowest rounded-[40px] border-[8px] border-[#313035] shadow-2xl overflow-hidden"
        style={{ width: 280, aspectRatio: '9/19' }}
        animate={{ y: [0, -16, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        <div className="bg-[#4131a1] text-white px-4 pt-12 pb-4 flex justify-between items-center rounded-b-3xl">
          <div>
            <p className="text-[10px] font-bold opacity-80 tracking-wide">Good Morning</p>
            <p className="text-lg font-extrabold">Alex</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#7265D5] flex items-center justify-center">
            <span className="material-symbols-outlined text-sm">person</span>
          </div>
        </div>
        <div className="flex-1 p-4 bg-[#f6f2f9] space-y-4 overflow-y-auto" style={{ height: 'calc(100% - 180px)' }}>
          <motion.div
            className="bg-white p-4 rounded-2xl border border-[#c9c4d5] shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-[#4131a1] text-lg">notifications_active</span>
              <span className="text-xs font-extrabold text-[#1c1b20]">Follow Up Required</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#1c1b20]">Sarah Jenkins</p>
                <p className="text-xs text-[#474553]">Met at Tech Conf</p>
              </div>
              <motion.button
                className="p-2 bg-[#7265D5]/20 text-[#4131a1] rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            className="bg-[#E8E4F8] p-4 rounded-2xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-[#4131a1] text-lg">auto_awesome</span>
              <span className="text-xs font-extrabold text-[#4131a1]">AI Suggestion</span>
            </div>
            <p className="text-xs text-[#474553]">Send a quick note to David about the new product launch.</p>
          </motion.div>
          <div>
            <p className="text-xs font-extrabold text-[#474553] mb-3 px-1">Recent Contacts</p>
            <div className="space-y-2">
              {[
                { initial: 'M', name: 'Michael Chang', role: 'Designer @ Studio' },
                { initial: 'E', name: 'Elena Rodriguez', role: 'Founder, TechStart' },
              ].map((c, i) => (
                <motion.div
                  key={c.name}
                  className="bg-white p-3 rounded-xl border border-[#c9c4d5] flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.15 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#f1ecf6] flex items-center justify-center text-[#474553] font-extrabold text-sm">
                    {c.initial}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1c1b20]">{c.name}</p>
                    <p className="text-xs text-[#474553]">{c.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white border-t border-[#c9c4d5] px-6 py-4 flex justify-between items-center">
          <span className="material-symbols-outlined text-[#4131a1] text-lg">home</span>
          <span className="material-symbols-outlined text-[#474553] text-lg">search</span>
          <motion.div
            className="w-12 h-12 rounded-full bg-[#4131a1] text-white flex items-center justify-center -mt-8 shadow-lg ring-4 ring-[#f6f2f9]"
            whileHover={{ scale: 1.1, rotate: 90 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="material-symbols-outlined text-lg">add</span>
          </motion.div>
          <span className="material-symbols-outlined text-[#474553] text-lg">history</span>
          <span className="material-symbols-outlined text-[#474553] text-lg">settings</span>
        </div>
      </motion.div>
      <motion.div
        className="w-[65%] h-[26px] bg-[#594BBA]/92 rounded-full blur-xl -mt-8"
        animate={{ scaleX: [1, 0.7, 1], opacity: [0.7, 0.3, 0.7] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

const marqueeItems = [
  'TECHNICAL HUMANISM', 'INTELLIGENT NETWORKING', 'SEAMLESS FOLLOW-UPS',
  'AI-POWERED INSIGHTS', 'YOUR PERSONAL CRM',
]

const featuresData = [
  {
    span: 'md:col-span-2', bg: 'bg-[#313035] text-white', icon: 'document_scanner',
    title: 'Scan Card. Save Context.', desc: 'Instantly digitize physical business cards. Our OCR technology doesn\'t just read names; it structures the data and prompts you to add contextual notes immediately.',
  },
  {
    span: '', bg: 'bg-[#E8E4F8]', icon: 'auto_awesome', iconBg: 'bg-white',
    title: 'AI Outreach', desc: 'Draft personalized follow-up emails based on your meeting notes with a single tap.',
  },
  {
    span: '', bg: 'bg-white border border-[#c9c4d5]', icon: 'mic', iconBg: 'bg-[#f1ecf6]',
    title: 'Meeting Recorder', desc: 'Dictate quick summaries after a meeting and let Folupz transcribe and organize the action items.',
  },
  {
    span: '', bg: 'bg-[#ece3bb]', icon: 'timeline', iconBg: 'bg-white',
    title: 'Relationship Timeline', desc: 'A beautiful chronological view of every interaction, note, and message with a contact.',
  },
  {
    span: '', bg: 'bg-white border border-[#c9c4d5]', icon: 'view_kanban', iconBg: 'bg-[#f1ecf6]',
    title: 'Visual Pipeline', desc: 'Track opportunities from first meeting to closed deal with a simple, drag-and-drop kanban board.',
  },
]

const tutorialsData = [
  {
    headerBg: 'bg-[#E8E4F8]', icon: 'dashboard', title: 'The Dashboard',
    desc: 'Your daily command center. See who needs attention today and quickly access your most recent contacts.',
    items: ['Review daily follow-up prompts', 'Quick-add new contacts', 'View high-priority relationship updates'],
  },
  {
    headerBg: 'bg-[#ebe6f0]', icon: 'person_add', title: 'Capture Flow',
    desc: 'The fastest way to digitize a new connection. Use the camera, voice, or manual entry.',
    items: ['Scan physical business cards', 'Record voice memos for context', 'Set initial follow-up timelines'],
  },
  {
    headerBg: 'bg-[#313035]', icon: 'contact_page', title: 'Contact Profile', dark: true,
    desc: 'The comprehensive view of a single relationship. All context, history, and notes in one place.',
    items: ['Edit contact details & tags', 'View interaction timeline', 'Generate AI outreach drafts'],
  },
  {
    headerBg: 'bg-[#ece3bb]', icon: 'search', title: 'Search & Filter',
    desc: 'Find anyone in your network instantly using semantic search and advanced filtering.',
    items: ['Search by context', 'Filter by tags or industry', 'Create smart lists'],
  },
  {
    headerBg: 'bg-[#e5e1e8]', icon: 'view_kanban', title: 'The Pipeline',
    desc: 'Manage active opportunities or hiring processes visually with customizable stages.',
    items: ['Drag and drop contacts between stages', 'Customize board columns', 'Track value of relationships'],
  },
  {
    headerBg: 'bg-[#e4dfff]', icon: 'settings', title: 'Settings & Integrations',
    desc: 'Connect Folupz to your existing tools and customize your notification preferences.',
    items: ['Sync with Google/Outlook Contacts', 'Adjust AI assistance levels', 'Manage data export & privacy'],
  },
]

function MaterialIcon({ icon, className = 'text-lg' }) {
  return <span className={`material-symbols-outlined ${className}`}>{icon}</span>
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-[720px] z-50 flex justify-between items-center px-6 py-3 rounded-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#313035]/90 backdrop-blur-md shadow-lg'
          : 'bg-[#313035]/80 backdrop-blur-sm'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.a
        className="text-white font-extrabold text-xl tracking-tight"
        href="#"
        whileHover={{ scale: 1.05 }}
      >
        Folupz
      </motion.a>
      <div className="hidden md:flex items-center gap-6">
        {['Features', 'How it Works', 'Tutorials', 'Pricing'].map((item, i) => (
          <motion.a
            key={item}
            className={`text-sm font-bold transition-all duration-200 ${
              i === 0 ? 'text-white border-b-2 border-[#7265D5] pb-1' : 'text-[#c8c6c5] hover:text-white'
            }`}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </motion.a>
        ))}
      </div>
      <motion.a
        className="hidden md:inline-flex items-center justify-center px-6 py-2 bg-[#4131a1] text-white rounded-full text-sm font-bold hover:shadow-lg"
        href="#download"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started
      </motion.a>
      <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-[#313035]/95 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-3 md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {['Features', 'How it Works', 'Tutorials', 'Pricing'].map((item) => (
              <a key={item} className="text-white font-bold text-sm py-2" href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setMenuOpen(false)}>
                {item}
              </a>
            ))}
            <a className="text-center px-6 py-2 bg-[#4131a1] text-white rounded-full text-sm font-bold" href="#download" onClick={() => setMenuOpen(false)}>
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function HeroSection() {
  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 0.3], [0, 100])

  return (
    <header className="relative pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-[#eceaf8] via-[#f6f2fc] to-[#fcf8ff]">
      <motion.div className="absolute top-[-80px] left-[-80px] w-[500px] h-[500px] rounded-full bg-[#E8E4F8] opacity-60 blur-[100px] pointer-events-none" style={{ y: bgY }} />
      <motion.div className="absolute bottom-[-60px] right-[10%] w-[400px] h-[400px] rounded-full bg-[#7265D5] opacity-15 blur-[120px] pointer-events-none" style={{ y: useTransform(scrollYProgress, [0, 0.3], [0, -80]) }} />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        <div className="flex-1 flex flex-col items-start text-left max-w-xl">
          <motion.div
            className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[#c9c4d5] shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-[#594BBA] inline-block"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <span className="text-[11px] font-bold tracking-widest text-[#594BBA] uppercase">AI-Powered Networking CRM</span>
          </motion.div>
          <motion.h1
            className="font-black leading-[1.05] tracking-tighter mb-6"
            style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-[#1c1b22]">Never lose a</span><br />
            <span className="bg-gradient-to-r from-[#594BBA] via-[#7265D5] to-[#a78bfa] bg-clip-text text-transparent">connection again.</span>
          </motion.h1>
          <motion.p
            className="text-[17px] leading-relaxed text-[#474553] mb-9 max-w-[480px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Folupz is the intelligent personal CRM that automatically organizes your network, remembers crucial details, and prompts you to reach out at <strong className="text-[#1c1b22]">exactly the right moment.</strong>
          </motion.p>
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex -space-x-2">
              {['A', 'M', 'S'].map((l, i) => (
                <motion.div
                  key={l}
                  className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                  style={{ background: ['#594BBA', '#7265D5', '#a78bfa'][i] }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
                >
                  {l}
                </motion.div>
              ))}
            </div>
            <p className="text-[13px] text-[#474553]"><strong className="text-[#1c1b22]">2,000+</strong> professionals already networking smarter</p>
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 items-start w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.a
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1c1b22] text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl"
              href="#download"
              whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(28,27,34,0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="material-symbols-outlined text-lg">android</span>
              Download for Android
            </motion.a>
            <motion.a
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#1c1b22] rounded-full text-sm font-bold border border-[#c9c4d5] shadow-sm hover:shadow-md"
              href="#tutorials"
              whileHover={{ scale: 1.05, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="material-symbols-outlined text-lg">play_circle</span>
              Watch Tutorial
            </motion.a>
          </motion.div>
        </div>
        <PhoneMockup />
      </div>
    </header>
  )
}

function MarqueeSection() {
  return (
    <div className="bg-[#313035] py-4 border-y border-white/10 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
      >
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="flex items-center gap-0">
            {marqueeItems.map((item) => (
              <span key={item} className="text-[11px] font-bold tracking-[0.1em] text-white/70 mx-4 uppercase">
                {item}
                <span className="text-[#7265D5] ml-4">✦</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function ProblemSolution() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger.container}
        >
          <motion.h2 variants={stagger.item} className="text-4xl md:text-5xl font-extrabold text-[#1c1b20] mb-4">
            The Reality of Networking
          </motion.h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-[#FFF0F0] rounded-2xl p-8 border border-[#ffdad6]/50"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(186,26,26,0.1)' }}
          >
            <motion.div
              className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#93000a] flex items-center justify-center mb-6"
              whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
            >
              <span className="material-symbols-outlined">sentiment_dissatisfied</span>
            </motion.div>
            <h3 className="text-xl font-bold text-[#1c1b20] mb-4">You meet people. You forget people.</h3>
            <p className="text-base text-[#474553] mb-6 leading-relaxed">Business cards get lost in drawers. LinkedIn connections get buried in the feed. The intent to follow up fades as the daily grind takes over.</p>
            <ul className="space-y-3">
              {['Lost opportunities', 'Forgotten context', 'Cold re-introductions'].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-sm mt-0.5">close</span>
                  <span className="text-[#474553]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="bg-[#E8E4F8] rounded-2xl p-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(65,49,161,0.12)' }}
          >
            <motion.div
              className="w-12 h-12 rounded-full bg-[#7265D5] text-white flex items-center justify-center mb-6"
              whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
            >
              <span className="material-symbols-outlined">psychology</span>
            </motion.div>
            <h3 className="text-xl font-bold text-[#1c1b20] mb-4">Folupz remembers.</h3>
            <p className="text-base text-[#474553] mb-6 leading-relaxed">Capture the moment immediately. Let AI structure the context. Never rely on your own memory for the crucial details of a relationship again.</p>
            <ul className="space-y-3">
              {['Instant capture', 'Automated context building', 'Warm, timely outreach'].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#4131a1] text-sm mt-0.5">check</span>
                  <span className="text-[#474553]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function BentoGrid() {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0.1, 0.3], [0, -30])
  const y2 = useTransform(scrollYProgress, [0.1, 0.3], [0, 30])
  const y3 = useTransform(scrollYProgress, [0.15, 0.35], [0, -20])
  const y4 = useTransform(scrollYProgress, [0.15, 0.35], [0, 20])

  return (
    <section className="hidden md:block min-h-[900px] w-full relative overflow-hidden bg-surface py-20">
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-10">
        <h2 className="text-[90px] font-extrabold text-[#1c1b20] tracking-tighter leading-[0.9] text-center uppercase opacity-[0.04]">
          AI-Powered<br />Networking
        </h2>
      </div>
      <motion.div
        className="absolute rounded-[32px] overflow-hidden backdrop-blur-2xl border border-white/40 bg-gradient-to-br from-[#E8E4F8] to-[#7265D5]"
        style={{ left: '8%', top: '10%', width: 300, height: 220, y: y1 }}
      >
        <span className="absolute top-4 left-4 text-[10px] font-bold text-white/60 uppercase">Scan Card</span>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/20 backdrop-blur-md">
          <div className="flex justify-between items-center mb-1">
            <span className="text-white/90 text-[10px] font-bold">Scanning...</span>
            <span className="text-white/90 text-[10px] font-bold">85%</span>
          </div>
          <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
            <motion.div
              className="bg-[#d6d0ff] h-full rounded-full"
              initial={{ width: '0%' }}
              whileInView={{ width: '85%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        className="absolute rounded-[32px] overflow-hidden backdrop-blur-2xl border border-white/40 bg-gradient-to-br from-[#ece3bb] to-[#4a4528]"
        style={{ right: '10%', top: '8%', width: 260, height: 300, y: y2 }}
      >
        <div className="absolute top-4 right-4 w-8 h-8 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-sm">auto_awesome</span>
        </div>
      </motion.div>
      <motion.div
        className="absolute bg-white/20 backdrop-blur-3xl border border-white/50 rounded-[28px] p-5 flex flex-col gap-4"
        style={{ left: '4%', top: '42%', width: 240, y: y3 }}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-[#1c1b20]">Auto Follow-Up</span>
          <div className="w-10 h-5 bg-[#4131a1] rounded-full relative">
            <motion.div
              className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"
              animate={{ x: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#7265D5] rounded-full flex items-center justify-center text-[10px] font-bold text-white">AI</div>
          <div>
            <p className="text-sm font-bold text-[#1c1b20]">AI Outreach</p>
            <p className="text-[10px] text-[#474553]">Active</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="absolute rounded-[32px] overflow-hidden backdrop-blur-2xl border border-white/40 bg-gradient-to-br from-[#d4ede8] to-[#7BB5AC]"
        style={{ right: '6%', top: '50%', width: 300, height: 200, y: y4 }}
      >
        <div className="absolute top-4 left-4 bg-white/40 backdrop-blur-xl rounded-full px-3 py-1 flex items-center gap-2">
          <div className="w-2 h-2 bg-[#E8F5E9] rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-[#1c1b20]">MEETING RECORDER</span>
        </div>
      </motion.div>
      <motion.div
        className="absolute rounded-[32px] overflow-hidden backdrop-blur-2xl border border-white/40 bg-gradient-to-br from-[#E8E4F8] to-[#9b93d4]"
        style={{ left: '14%', top: '68%', width: 340, height: 220, y: useTransform(scrollYProgress, [0.2, 0.4], [0, -20]) }}
      >
        <div className="absolute bottom-4 left-4 bg-white/40 backdrop-blur-xl rounded-full px-3 py-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#1c1b20] text-sm">mic</span>
          <span className="text-[10px] font-bold text-[#1c1b20]">VOICE NOTE</span>
        </div>
      </motion.div>
      <motion.div
        className="absolute rounded-[32px] overflow-hidden backdrop-blur-2xl border border-white/40 bg-gradient-to-br from-[#313035] to-[#4131a1]"
        style={{ right: '14%', top: '74%', width: 320, height: 200, y: useTransform(scrollYProgress, [0.2, 0.4], [0, 20]) }}
      />
      <motion.div
        className="absolute bg-white/30 backdrop-blur-3xl border border-white/50 rounded-[24px] p-3 flex items-center gap-3 shadow-sm"
        style={{ left: '42%', bottom: '8%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-[#E8E4F8] rounded-full w-10 h-10 flex items-center justify-center text-xs font-bold text-[#4131a1]">PR</div>
        <div>
          <p className="font-bold text-[#1c1b20] text-sm">Priya S.</p>
          <p className="text-[#474553] text-xs">Game changing app!</p>
        </div>
      </motion.div>
    </section>
  )
}

function FeaturesGrid() {
  return (
    <section className="py-24 px-6 bg-[#f6f2f9]" id="features">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger.container}
        >
          <motion.h2 variants={stagger.item} className="text-4xl md:text-5xl font-extrabold text-[#1c1b20] mb-4">
            Features that build relationships.
          </motion.h2>
          <motion.p variants={stagger.item} className="text-lg text-[#474553] max-w-2xl">
            Everything you need to manage your network, beautifully designed and powered by intelligent automation.
          </motion.p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger.container}
        >
          {featuresData.map((f, i) => (
            <motion.div
              key={f.title}
              className={`${f.span} ${f.bg} rounded-2xl p-8 overflow-hidden relative group`}
              variants={stagger.item}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {i === 0 && (
                <motion.div
                  className="absolute right-0 top-0 w-64 h-64 bg-[#7265D5]/20 rounded-full blur-3xl -mr-20 -mt-20"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                />
              )}
              <div className="relative z-10">
                <motion.div
                  className={`w-12 h-12 rounded-full ${i === 0 ? 'bg-[#4131a1]/30 border border-[#7265D5]/30' : f.iconBg || 'bg-[#f1ecf6]'} flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className={`material-symbols-outlined ${i === 0 ? 'text-white' : 'text-[#4131a1]'}`}>{f.icon}</span>
                </motion.div>
                <h3 className={`text-xl font-bold mb-2 ${i === 0 ? 'text-white' : 'text-[#1c1b20]'}`}>{f.title}</h3>
                <p className={`text-base leading-relaxed ${i === 0 ? 'text-[#c8c6c5]' : 'text-[#474553]'} max-w-md`}>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="py-24 px-6 overflow-hidden" id="how-it-works" style={{ background: 'linear-gradient(135deg, #eceaf8 0%, #e8e4f8 40%, #ddd8f5 100%)' }}>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#594BBA] text-xs font-bold uppercase tracking-[0.1em] mb-6"
        >
          How It Works
        </motion.div>
        <motion.h2
          className="font-black tracking-tight mb-4 leading-tight bg-gradient-to-r from-[#1c1b22] via-[#594BBA] to-[#4131a1] bg-clip-text text-transparent"
          style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          From card to closed — in minutes
        </motion.h2>
        <motion.p
          className="text-[#474553] text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          A seamless flow from introduction to lasting relationship.
        </motion.p>
      </div>
      <div className="relative w-full max-w-[1200px] mx-auto overflow-visible">
        <svg className="overflow-visible" viewBox="0 0 1400 600" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <defs>
            <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F9EFC7" />
              <stop offset="30%" stopColor="#c4bef5" />
              <stop offset="70%" stopColor="#594BBA" />
              <stop offset="100%" stopColor="#2a2266" />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#594BBA" floodOpacity="0.25" />
            </filter>
          </defs>
          <motion.path
            d="M 0,450 C 200,450 250,100 450,100 C 650,100 700,500 900,500 C 1100,500 1150,150 1400,150 L 1400,215 C 1150,215 1100,565 900,565 C 700,565 650,165 450,165 C 250,165 200,515 0,515 Z"
            fill="url(#ribbonGrad)"
            filter="url(#shadow)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          {[
            { step: 'STEP 01', title: 'Meet', desc: 'Make a connection.', x: 80, lineY1: 482, lineY2: 350 },
            { step: 'STEP 02', title: 'Capture', desc: 'Scan their card.', x: 450, lineY1: 132, lineY2: 450 },
            { step: 'STEP 03', title: 'Nurture', desc: 'AI drafts your message.', x: 900, lineY1: 515, lineY2: 360 },
            { step: 'STEP 04', title: 'Close', desc: 'Convert to opportunity.', x: 1280, lineY1: 178, lineY2: 300 },
          ].map((s, i) => (
            <motion.g
              key={s.step}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.3 }}
            >
              <line stroke="#594BBA" strokeDasharray="4,4" strokeWidth="1" opacity="0.6" x1={s.x} x2={s.x} y1={s.lineY1} y2={s.lineY2} />
              <text fill="#594BBA" fontSize="12" fontWeight="700" textAnchor="middle" x={s.x} y={s.lineY1 > 300 ? s.lineY1 + 30 : s.lineY1 - 40}>{s.step}</text>
              <text fill="#1c1b22" fontSize="26" fontWeight="900" textAnchor="middle" x={s.x} y={s.lineY1 > 300 ? s.lineY1 + 60 : s.lineY1 - 10}>{s.title}</text>
              <text fill="#474553" fontSize="15" textAnchor="middle" x={s.x} y={s.lineY1 > 300 ? s.lineY1 + 80 : s.lineY1 + 10}>{s.desc}</text>
              <motion.circle
                cx={s.x} cy={s.lineY1} r={24} fill="#594BBA" stroke="white" strokeWidth="4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.3, type: 'spring', stiffness: 200 }}
              />
              <text fill="white" fontSize="15" fontWeight="900" textAnchor="middle" x={s.x} y={s.lineY1 + 5}>{i + 1}</text>
            </motion.g>
          ))}
        </svg>
      </div>
    </section>
  )
}

function Tutorials() {
  return (
    <section className="py-24 px-6 bg-[#f6f2f9] border-t border-[#c9c4d5]/30" id="tutorials">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger.container}
        >
          <motion.span variants={stagger.item} className="text-[#4131a1] text-xs font-bold uppercase tracking-[0.1em] mb-2 block">Documentation</motion.span>
          <motion.h2 variants={stagger.item} className="text-4xl md:text-5xl font-extrabold text-[#1c1b20] mb-4">Every screen, explained.</motion.h2>
          <motion.p variants={stagger.item} className="text-lg text-[#474553] max-w-2xl">Master the Folupz interface. A complete guide to maximizing your networking efficiency.</motion.p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger.container}
        >
          {tutorialsData.map((t) => (
            <motion.div
              key={t.title}
              className="bg-white border border-[#c9c4d5] rounded-2xl overflow-hidden flex flex-col h-full"
              variants={stagger.item}
              whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(65,49,161,0.1)' }}
            >
              <div className={`${t.headerBg} p-6 border-b border-[#c9c4d5]/30`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`material-symbols-outlined ${t.dark ? 'text-white' : 'text-[#4131a1]'}`}>{t.icon}</span>
                  <h3 className={`text-xl font-bold ${t.dark ? 'text-white' : 'text-[#1c1b20]'}`}>{t.title}</h3>
                </div>
              </div>
              <div className="p-6 flex-1 bg-white">
                <p className="text-base text-[#474553] mb-6 leading-relaxed">{t.desc}</p>
                <p className="text-sm font-bold text-[#1c1b20] mb-3">What you can do here:</p>
                <ul className="space-y-2">
                  {t.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#787584] text-sm mt-0.5">arrow_right</span>
                      <span className="text-sm text-[#474553]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-[#1c1b20] mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Loved by professionals
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { initials: 'JD', name: 'Jane Doe', role: 'Founder & CEO', quote: 'Folupz completely changed how I manage my network. I used to rely on scattered notes and memory. Now, the AI prompts me exactly when I need to reach out.' },
            { initials: 'MS', name: 'Mark Smith', role: 'Sales Director', quote: 'The business card scanner is the best I\'ve used. It actually understands context and links it to the calendar event where we met.' },
            { initials: 'AW', name: 'Alice Wong', role: 'Freelance Consultant', quote: 'Finally, a CRM that feels like a personal assistant rather than a data entry chore. The UI is incredibly clean and focused.' },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-white border border-[#c9c4d5] rounded-2xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(65,49,161,0.08)' }}
            >
              <div className="flex gap-1 text-[#4131a1] mb-4">
                {[...Array(5)].map((_, j) => (
                  <motion.span
                    key={j}
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + j * 0.08 }}
                  >
                    star
                  </motion.span>
                ))}
              </div>
              <p className="text-base text-[#474553] mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#f1ecf6] rounded-full flex items-center justify-center font-bold text-[#474553]">{t.initials}</div>
                <div>
                  <p className="text-sm font-bold text-[#1c1b20]">{t.name}</p>
                  <p className="text-xs text-[#474553]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section
      id="download"
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2d2080 0%, #4131a1 40%, #594BBA 70%, #7265D5 100%)' }}
    >
      <RotatingRing className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 pointer-events-none" size={600} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white/20 pointer-events-none" />
      <motion.div
        className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[#c7bfff]/20 blur-[80px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#594BBA]/40 blur-[80px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }}
      />

      <FloatingShape className="absolute left-[6%] top-[20%] bg-white/10 backdrop-blur-lg border border-white/20 rounded-[20px] p-4 flex items-center gap-3" duration={4}>
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-lg">notifications_active</span>
        </div>
        <div>
          <p className="text-white text-xs font-bold">Follow-up sent</p>
          <p className="text-white/60 text-[11px]">Sarah Jenkins • just now</p>
        </div>
      </FloatingShape>

      <FloatingShape className="absolute right-[6%] top-[15%] bg-white/10 backdrop-blur-lg border border-white/20 rounded-[20px] p-4 flex items-center gap-3" duration={5}>
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-lg">person_add</span>
        </div>
        <div>
          <p className="text-white text-xs font-bold">New connection</p>
          <p className="text-white/60 text-[11px]">Michael Chang added</p>
        </div>
      </FloatingShape>

      <FloatingShape className="absolute left-[8%] bottom-[20%] bg-white/10 backdrop-blur-lg border border-white/20 rounded-[20px] p-4 flex items-center gap-3" duration={6}>
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-lg">auto_awesome</span>
        </div>
        <div>
          <p className="text-white text-xs font-bold">AI drafted message</p>
          <p className="text-white/60 text-[11px]">Ready to send</p>
        </div>
      </FloatingShape>

      <div className="max-w-[700px] mx-auto text-center relative z-10">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 mb-7"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] inline-block" />
          <span className="text-[11px] font-bold tracking-[0.1em] text-white/90 uppercase">Join 2,000+ professionals</span>
        </motion.div>

        <motion.h2
          className="font-black leading-[1.05] tracking-tight text-white mb-5"
          style={{ fontSize: 'clamp(36px, 5vw, 62px)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Ready to build<br />
          <span className="bg-gradient-to-r from-[#e4dfff] to-[#c7bfff] bg-clip-text text-transparent">better relationships?</span>
        </motion.h2>

        <motion.p
          className="text-lg leading-relaxed text-white/75 mb-12 max-w-[520px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Join thousands of professionals who have automated their networking with Folupz — and never miss a follow-up again.
        </motion.p>

        <motion.div
          className="flex justify-center items-center gap-1 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-[#fbbf24] text-xl">★★★★★</span>
          <span className="text-white/70 text-sm ml-2">Loved by networkers worldwide</span>
        </motion.div>

        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <PulseRing className="absolute inset-[-8px] rounded-full border-2 border-white/40 pointer-events-none" />
          <motion.a
            href="#"
            className="relative inline-flex items-center gap-2.5 px-10 py-4.5 bg-white text-[#4131a1] rounded-full text-base font-extrabold tracking-wide no-underline shadow-xl z-1"
            whileHover={{ scale: 1.06, boxShadow: '0 12px 40px rgba(0,0,0,0.35)' }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="material-symbols-outlined text-lg">android</span>
            Download for Android — It's Free
          </motion.a>
        </motion.div>

        <motion.p
          className="mt-4 text-xs text-white/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          No credit card required · Works offline · 2 min setup
        </motion.p>
      </div>
    </section>
  )
}

function FooterSection() {
  return (
    <footer className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#313035]">
      <div className="flex flex-col items-center md:items-start gap-4">
        <span className="text-2xl font-extrabold text-white">Folupz</span>
        <span className="text-white/70 text-sm">© 2024 Folupz. Technical Humanism in Motion.</span>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {['Privacy Policy', 'Terms of Service', 'Contact Us', 'Twitter', 'LinkedIn'].map((item) => (
          <motion.a
            key={item}
            className="text-sm font-bold text-[#c8c6c5] hover:text-white transition-colors"
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </motion.a>
        ))}
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <ProblemSolution />
      <BentoGrid />
      <FeaturesGrid />
      <HowItWorks />
      <Tutorials />
      <Testimonials />
      <FinalCta />
      <FooterSection />
    </>
  )
}

export default App
