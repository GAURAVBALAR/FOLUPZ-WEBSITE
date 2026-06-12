import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import CustomCursor from './CustomCursor'
import GlowCard from './GlowCard'
import TiltContainer from './TiltContainer'
import MiniPhoneMockup from './MiniPhoneMockup'
import MagneticButton from './MagneticButton'

const stagger = {
  container: { visible: { transition: { staggerChildren: 0.08 } } },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
}

const marqueeItems = [
  'TECHNICAL HUMANISM', 'INTELLIGENT NETWORKING', 'SEAMLESS FOLLOW-UPS',
  'AI-POWERED INSIGHTS', 'YOUR PERSONAL CRM',
]

const featuresData = [
  {
    span: 'md:col-span-2', bg: 'bg-[#313035] text-white', icon: 'document_scanner',
    title: 'Scan Card. Save Context.', desc: 'Instantly digitize physical business cards. Our OCR technology doesn\'t just read names; it structures the data and prompts you to add contextual notes immediately.',
    glowColor: 'rgba(255, 255, 255, 0.05)'
  },
  {
    span: '', bg: 'bg-[#E8E4F8]', icon: 'auto_awesome', iconBg: 'bg-white',
    title: 'AI Outreach', desc: 'Draft personalized follow-up emails based on your meeting notes with a single tap.',
    glowColor: 'rgba(114, 101, 213, 0.12)'
  },
  {
    span: '', bg: 'bg-white border border-[#c9c4d5]', icon: 'mic', iconBg: 'bg-[#f1ecf6]',
    title: 'Meeting Recorder', desc: 'Dictate quick summaries after a meeting and let Folupz transcribe and organize the action items.',
    glowColor: 'rgba(114, 101, 213, 0.08)'
  },
  {
    span: '', bg: 'bg-[#ece3bb]', icon: 'timeline', iconBg: 'bg-white',
    title: 'Relationship Timeline', desc: 'A beautiful chronological view of every interaction, note, and message with a contact.',
    glowColor: 'rgba(74, 69, 40, 0.08)'
  },
  {
    span: '', bg: 'bg-white border border-[#c9c4d5]', icon: 'view_kanban', iconBg: 'bg-[#f1ecf6]',
    title: 'Visual Pipeline', desc: 'Track opportunities from first meeting to closed deal with a simple, drag-and-drop kanban board.',
    glowColor: 'rgba(114, 101, 213, 0.08)'
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

const plans = [
  {
    name: 'Starter', price: 'Free', desc: 'Perfect for individual professionals getting started.',
    features: ['Up to 50 contacts', 'Basic card scanning', 'Manual follow-up reminders', 'Email integration'],
  },
  {
    name: 'Pro', price: '$12', period: '/mo', desc: 'For power networkers who need AI assistance.',
    features: ['Unlimited contacts', 'AI-powered outreach drafts', 'Meeting recorder & transcripts', 'Smart lists & filters', 'Priority support'],
    popular: true,
  },
  {
    name: 'Team', price: '$29', period: '/mo', desc: 'For teams managing relationships together.',
    features: ['Everything in Pro', 'Shared contacts & pipeline', 'Team analytics dashboard', 'CRM integrations', 'Admin controls & SSO'],
  },
]

function Navbar({ setViewMode }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[760px] z-50 flex justify-between items-center px-6 py-3 rounded-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#313035]/90 backdrop-blur-md shadow-lg border border-white/5'
          : 'bg-[#313035]/80 backdrop-blur-sm border border-white/5'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.a
        className="text-white font-extrabold text-xl tracking-tight flex items-center gap-1.5"
        href="#"
        whileHover={{ scale: 1.05 }}
      >
        <span className="w-5 h-5 rounded bg-[#7265D5] flex items-center justify-center text-[10px] font-black">F</span>
        Folupz
      </motion.a>
      <div className="hidden md:flex items-center gap-6">
        {['Features', 'How it Works', 'Pricing', 'Tutorials'].map((item, i) => (
          <motion.a
            key={item}
            className="text-xs font-bold transition-all duration-200 text-[#c8c6c5] hover:text-white"
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </motion.a>
        ))}
      </div>
      <div className="hidden md:flex items-center gap-2">
        <MagneticButton>
          <motion.button
            onClick={() => setViewMode('app')}
            className="inline-flex items-center justify-center px-5 py-2 bg-[#7265D5]/20 border border-[#7265D5]/30 text-[#c7bfff] rounded-full text-xs font-bold hover:bg-[#7265D5]/35 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Demo
          </motion.button>
        </MagneticButton>
      </div>
      <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-[#313035]/95 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-3 md:hidden border border-white/5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {['Features', 'How it Works', 'Pricing', 'Tutorials'].map((item) => (
              <a key={item} className="text-white font-bold text-xs py-2" href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setMenuOpen(false)}>
                {item}
              </a>
            ))}
            <button
              className="text-center px-6 py-2 bg-[#7265D5] text-white rounded-full text-xs font-bold"
              onClick={() => {
                setMenuOpen(false)
                setViewMode('app')
              }}
            >
              Launch Sandbox
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function HeroSection({ setViewMode }) {
  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 0.3], [0, 100])

  return (
    <header className="relative pt-36 pb-24 px-6 overflow-hidden bg-gradient-to-br from-[#eceaf8] via-[#f6f2fc] to-[#fcf8ff]">
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
            <span className="text-[10px] font-black tracking-widest text-[#594BBA] uppercase">AI-Powered Networking CRM</span>
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
            className="text-[16px] leading-relaxed text-[#474553] mb-9 max-w-[480px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Folupz is the intelligent personal CRM that automatically organizes your network, remembers crucial details, and prompts you to reach out at <strong className="text-[#1c1b22]">exactly the right moment.</strong>
          </motion.p>

          {/* User avatars */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex -space-x-2">
              {['A', 'M', 'S'].map((l, i) => (
                <div
                  key={l}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: ['#594BBA', '#7265D5', '#a78bfa'][i] }}
                >
                  {l}
                </div>
              ))}
            </div>
            <p className="text-[12px] text-[#474553]"><strong className="text-[#1c1b22]">2,000+</strong> professionals already networking smarter</p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 items-start w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MagneticButton>
              <motion.button
                onClick={() => setViewMode('app')}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1c1b22] text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl w-full sm:w-auto justify-center cursor-pointer"
                whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(28,27,34,0.25)' }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="material-symbols-outlined text-base">rocket_launch</span>
                Launch Live App Sandbox
              </motion.button>
            </MagneticButton>
            <MagneticButton>
              <motion.a
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#1c1b22] rounded-full text-sm font-bold border border-[#c9c4d5] shadow-sm hover:shadow-md w-full sm:w-auto justify-center cursor-pointer"
                href="#how-it-works"
                whileHover={{ scale: 1.05, boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="material-symbols-outlined text-base">play_circle</span>
                How it works
              </motion.a>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Interactive Phone simulator */}
        <TiltContainer maxRotate={8}>
          <MiniPhoneMockup />
        </TiltContainer>
      </div>
    </header>
  )
}

function MarqueeSection() {
  return (
    <div className="bg-[#313035] py-4 border-y border-white/10 overflow-hidden relative z-20">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
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
    <section className="py-24 px-6 bg-surface relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger.container}
        >
          <motion.h2 variants={stagger.item} className="text-3xl md:text-4xl font-black text-[#1c1b20] mb-4">
            The Reality of Networking
          </motion.h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <TiltContainer maxRotate={4}>
            <GlowCard
              className="bg-[#FFF0F0] p-8 border border-[#ffdad6]/50 h-full"
              glowColor="rgba(186, 26, 26, 0.08)"
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#93000a] flex items-center justify-center mb-6"
                whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
              >
                <span className="material-symbols-outlined">sentiment_dissatisfied</span>
              </motion.div>
              <h3 className="text-xl font-bold text-[#1c1b20] mb-4">You meet people. You forget people.</h3>
              <p className="text-xs text-[#474553] mb-6 leading-relaxed">
                Business cards get lost in drawers. LinkedIn connections get buried in the feed. The intent to follow up fades as the daily grind takes over.
              </p>
              <ul className="space-y-3">
                {['Lost opportunities', 'Forgotten context', 'Cold re-introductions'].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-sm mt-0.5">close</span>
                    <span className="text-xs text-[#474553]">{item}</span>
                  </li>
                ))}
              </ul>
            </GlowCard>
          </TiltContainer>

          <TiltContainer maxRotate={4}>
            <GlowCard
              className="bg-[#E8E4F8] p-8 border border-[#7265D5]/15 h-full"
              glowColor="rgba(114, 101, 213, 0.15)"
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-[#7265D5] text-white flex items-center justify-center mb-6"
                whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
              >
                <span className="material-symbols-outlined">psychology</span>
              </motion.div>
              <h3 className="text-xl font-bold text-[#1c1b20] mb-4">Folupz remembers.</h3>
              <p className="text-xs text-[#474553] mb-6 leading-relaxed">
                Capture the moment immediately. Let AI structure the context. Never rely on your own memory for the crucial details of a relationship again.
              </p>
              <ul className="space-y-3">
                {['Instant capture', 'Automated context building', 'Warm, timely outreach'].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#4131a1] text-sm mt-0.5">check</span>
                    <span className="text-xs text-[#474553]">{item}</span>
                  </li>
                ))}
              </ul>
            </GlowCard>
          </TiltContainer>
        </div>
      </div>
    </section>
  )
}

function BentoGrid() {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0.1, 0.4], [0, -35])
  const y2 = useTransform(scrollYProgress, [0.1, 0.4], [0, 35])
  const y3 = useTransform(scrollYProgress, [0.15, 0.45], [0, -25])
  const y4 = useTransform(scrollYProgress, [0.15, 0.45], [0, 25])

  return (
    <section className="hidden md:block min-h-[900px] w-full relative overflow-hidden bg-surface py-20 z-10">
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-10">
        <h2 className="text-[80px] font-black text-[#1c1b20] tracking-tighter leading-[0.9] text-center uppercase opacity-[0.03]">
          AI-Powered<br />Networking
        </h2>
      </div>

      <motion.div
        className="absolute rounded-[32px] overflow-hidden backdrop-blur-2xl border border-white/40 bg-gradient-to-br from-[#E8E4F8] to-[#7265D5] shadow-lg"
        style={{ left: '8%', top: '10%', width: 300, height: 220, y: y1 }}
      >
        <span className="absolute top-4 left-4 text-[9px] font-black text-white/60 uppercase">Scan Card</span>
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
        className="absolute rounded-[32px] overflow-hidden backdrop-blur-2xl border border-white/40 bg-gradient-to-br from-[#ece3bb] to-[#4a4528] shadow-lg"
        style={{ right: '10%', top: '8%', width: 260, height: 300, y: y2 }}
      >
        <div className="absolute top-4 right-4 w-8 h-8 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-sm">auto_awesome</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bg-white/20 backdrop-blur-3xl border border-white/50 rounded-[28px] p-5 flex flex-col gap-4 shadow-lg"
        style={{ left: '4%', top: '42%', width: 240, y: y3 }}
      >
        <div className="flex justify-between items-center">
          <span className="text-xs font-black text-[#1c1b20]">Auto Follow-Up</span>
          <div className="w-10 h-5 bg-[#4131a1] rounded-full relative">
            <motion.div
              className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"
              animate={{ x: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#7265D5] rounded-full flex items-center justify-center text-[9px] font-black text-white">AI</div>
          <div>
            <p className="text-xs font-bold text-[#1c1b20]">AI Outreach</p>
            <p className="text-[9px] text-[#474553]">Active</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute rounded-[32px] overflow-hidden backdrop-blur-2xl border border-white/40 bg-gradient-to-br from-[#d4ede8] to-[#7BB5AC] shadow-lg"
        style={{ right: '6%', top: '50%', width: 300, height: 200, y: y4 }}
      >
        <div className="absolute top-4 left-4 bg-white/40 backdrop-blur-xl rounded-full px-3 py-1 flex items-center gap-2">
          <div className="w-2 h-2 bg-[#E8F5E9] rounded-full animate-pulse" />
          <span className="text-[9px] font-black text-[#1c1b20]">MEETING RECORDER</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute rounded-[32px] overflow-hidden backdrop-blur-2xl border border-white/40 bg-gradient-to-br from-[#E8E4F8] to-[#9b93d4] shadow-lg"
        style={{ left: '14%', top: '68%', width: 340, height: 220, y: useTransform(scrollYProgress, [0.2, 0.45], [0, -20]) }}
      >
        <div className="absolute bottom-4 left-4 bg-white/40 backdrop-blur-xl rounded-full px-3 py-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#1c1b20] text-sm">mic</span>
          <span className="text-[9px] font-black text-[#1c1b20]">VOICE NOTE</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute rounded-[32px] overflow-hidden backdrop-blur-2xl border border-white/40 bg-gradient-to-br from-[#313035] to-[#4131a1] shadow-lg"
        style={{ right: '14%', top: '74%', width: 320, height: 200, y: useTransform(scrollYProgress, [0.2, 0.45], [0, 20]) }}
      />
    </section>
  )
}

function FeaturesGrid() {
  return (
    <section className="py-24 px-6 bg-[#f6f2f9] relative z-10" id="features">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger.container}
        >
          <motion.h2 variants={stagger.item} className="text-3xl md:text-4xl font-black text-[#1c1b20] mb-4">
            Features that build relationships.
          </motion.h2>
          <motion.p variants={stagger.item} className="text-base text-[#474553] max-w-xl">
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
              className={`${f.span} h-full`}
              variants={stagger.item}
            >
              <TiltContainer maxRotate={3} className="h-full">
                <GlowCard
                  className={`${f.bg} p-8 h-full min-h-[240px]`}
                  glowColor={f.glowColor}
                >
                  <div className="relative z-10">
                    <motion.div
                      className={`w-12 h-12 rounded-full ${i === 0 ? 'bg-[#4131a1]/30 border border-[#7265D5]/30' : f.iconBg || 'bg-[#f1ecf6]'} flex items-center justify-center mb-6`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <span className={`material-symbols-outlined ${i === 0 ? 'text-white' : 'text-[#4131a1]'}`}>{f.icon}</span>
                    </motion.div>
                    <h3 className={`text-lg font-black mb-2 ${i === 0 ? 'text-white' : 'text-[#1c1b20]'}`}>{f.title}</h3>
                    <p className={`text-xs leading-relaxed ${i === 0 ? 'text-[#c8c6c5]' : 'text-[#474553]'} max-w-md`}>{f.desc}</p>
                  </div>
                </GlowCard>
              </TiltContainer>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="py-24 px-6 overflow-hidden relative z-10" id="how-it-works" style={{ background: 'linear-gradient(135deg, #eceaf8 0%, #e8e4f8 40%, #ddd8f5 100%)' }}>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#594BBA] text-xs font-black uppercase tracking-[0.15em] mb-6"
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
              <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#594BBA" floodOpacity="0.2" />
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
              <text fill="#594BBA" fontSize="11" fontWeight="800" textAnchor="middle" x={s.x} y={s.lineY1 > 300 ? s.lineY1 + 30 : s.lineY1 - 40}>{s.step}</text>
              <text fill="#1c1b22" fontSize="24" fontWeight="900" textAnchor="middle" x={s.x} y={s.lineY1 > 300 ? s.lineY1 + 55 : s.lineY1 - 10}>{s.title}</text>
              <text fill="#474553" fontSize="13" textAnchor="middle" x={s.x} y={s.lineY1 > 300 ? s.lineY1 + 75 : s.lineY1 + 10}>{s.desc}</text>
              <motion.circle
                cx={s.x} cy={s.lineY1} r={20} fill="#594BBA" stroke="white" strokeWidth="3"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.3, type: 'spring', stiffness: 200 }}
              />
              <text fill="white" fontSize="13" fontWeight="900" textAnchor="middle" x={s.x} y={s.lineY1 + 4}>{i + 1}</text>
            </motion.g>
          ))}
        </svg>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section className="py-24 px-6 bg-surface relative z-10" id="pricing">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger.container}
        >
          <motion.span variants={stagger.item} className="text-[#4131a1] text-xs font-black uppercase tracking-[0.1em] mb-2 block">Pricing</motion.span>
          <motion.h2 variants={stagger.item} className="text-3xl md:text-4xl font-black text-[#1c1b20] mb-4">Simple, transparent pricing.</motion.h2>
          <motion.p variants={stagger.item} className="text-base text-[#474553] max-w-xl mx-auto">No hidden fees. No surprise charges. Start free and upgrade as your network grows.</motion.p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger.container}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-3xl p-8 flex flex-col ${plan.popular ? 'bg-[#4131a1] text-white ring-2 ring-[#7265D5] shadow-2xl scale-105' : 'bg-white border border-[#c9c4d5]'}`}
              variants={stagger.item}
              whileHover={{ y: -8 }}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#7265D5] text-white text-[10px] font-black rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className={`text-lg font-black mb-1 ${plan.popular ? 'text-white' : 'text-[#1c1b20]'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-black ${plan.popular ? 'text-white' : 'text-[#1c1b20]'}`}>{plan.price}</span>
                  {plan.period && <span className={`text-xs ${plan.popular ? 'text-white/70' : 'text-[#474553]'}`}>{plan.period}</span>}
                </div>
                <p className={`text-xs mt-2 leading-relaxed ${plan.popular ? 'text-white/70' : 'text-[#474553]'}`}>{plan.desc}</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className={`material-symbols-outlined text-sm mt-0.5 ${plan.popular ? 'text-[#c7bfff]' : 'text-[#4131a1]'}`}>check</span>
                    <span className={`text-xs ${plan.popular ? 'text-white/80' : 'text-[#474553]'}`}>{f}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                href="#download"
                className={`text-center w-full py-3 rounded-full text-xs font-black transition-all cursor-pointer ${
                  plan.popular
                    ? 'bg-white text-[#4131a1] hover:shadow-xl'
                    : 'bg-[#1c1b22] text-white hover:shadow-lg'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {plan.name === 'Starter' ? 'Get Started Free' : `Start ${plan.name}`}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Tutorials() {
  return (
    <section className="py-24 px-6 bg-[#f6f2f9] border-t border-[#c9c4d5]/30 relative z-10" id="tutorials">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger.container}
        >
          <motion.span variants={stagger.item} className="text-[#4131a1] text-xs font-black uppercase tracking-[0.1em] mb-2 block">Documentation</motion.span>
          <motion.h2 variants={stagger.item} className="text-3xl md:text-4xl font-black text-[#1c1b20] mb-4">Every screen, explained.</motion.h2>
          <motion.p variants={stagger.item} className="text-base text-[#474553] max-w-xl">Master the Folupz interface. A complete guide to maximizing your networking efficiency.</motion.p>
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
              className="bg-white border border-[#c9c4d5] rounded-2xl overflow-hidden flex flex-col h-full shadow-sm"
              variants={stagger.item}
              whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(65,49,161,0.06)' }}
            >
              <div className={`${t.headerBg} p-6 border-b border-[#c9c4d5]/30`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`material-symbols-outlined ${t.dark ? 'text-white' : 'text-[#4131a1]'}`}>{t.icon}</span>
                  <h3 className={`text-base font-black ${t.dark ? 'text-white' : 'text-[#1c1b20]'}`}>{t.title}</h3>
                </div>
              </div>
              <div className="p-6 flex-1 bg-white space-y-4">
                <p className="text-xs text-[#474553] leading-relaxed">{t.desc}</p>
                <p className="text-xs font-black text-[#1c1b20]">What you can do here:</p>
                <ul className="space-y-2">
                  {t.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#787584] text-xs mt-0.5">arrow_right</span>
                      <span className="text-xs text-[#474553]">{item}</span>
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
    <section className="py-24 px-6 bg-surface relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-black text-[#1c1b20] mb-12 text-center"
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
              className="bg-white border border-[#c9c4d5] rounded-3xl p-8 shadow-sm flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(65,49,161,0.05)' }}
            >
              <div>
                <div className="flex gap-0.5 text-[#4131a1] mb-5">
                  {[...Array(5)].map((_, j) => (
                    <motion.span
                      key={j}
                      className="material-symbols-outlined text-base"
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
                <p className="text-xs text-[#474553] mb-6 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-9 h-9 bg-[#f1ecf6] rounded-full flex items-center justify-center font-bold text-xs text-[#474553]">
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1c1b20]">{t.name}</p>
                  <p className="text-[10px] text-[#474553]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCta({ setViewMode }) {
  return (
    <section
      id="download"
      className="relative py-32 px-6 overflow-hidden z-10"
      style={{ background: 'linear-gradient(135deg, #2d2080 0%, #4131a1 40%, #594BBA 70%, #7265D5 100%)' }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white/15 pointer-events-none" />
      
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

      <div className="max-w-[700px] mx-auto text-center relative z-10">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 mb-7"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] inline-block" />
          <span className="text-[10px] font-black tracking-[0.1em] text-white/90 uppercase">Join 2,000+ professionals</span>
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
          className="text-base leading-relaxed text-white/75 mb-12 max-w-[520px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Join thousands of professionals who have automated their networking with Folupz — and never miss a follow-up again.
        </motion.p>

        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <MagneticButton>
            <motion.button
              onClick={() => setViewMode('app')}
              className="relative inline-flex items-center gap-2.5 px-10 py-4 bg-white text-[#4131a1] rounded-full text-base font-black tracking-wide shadow-xl z-10 cursor-pointer"
              whileHover={{ scale: 1.06, boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="material-symbols-outlined text-base">rocket_launch</span>
              Open Live Sandbox Sandbox — It's Free
            </motion.button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}

function FooterSection() {
  return (
    <footer className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#313035] relative z-25">
      <div className="flex flex-col items-center md:items-start gap-2">
        <span className="text-xl font-black text-white">Folupz</span>
        <span className="text-white/60 text-xs font-bold">© 2026 Folupz. Technical Humanism in Motion.</span>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((item) => (
          <motion.a
            key={item}
            className="text-xs font-bold text-[#c8c6c5] hover:text-white transition-colors"
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

export default function LandingPage({ setViewMode }) {
  return (
    <div className="relative">
      <CustomCursor />
      <Navbar setViewMode={setViewMode} />
      <HeroSection setViewMode={setViewMode} />
      <MarqueeSection />
      <ProblemSolution />
      <BentoGrid />
      <FeaturesGrid />
      <HowItWorks />
      <Pricing />
      <Tutorials />
      <Testimonials />
      <FinalCta setViewMode={setViewMode} />
      <FooterSection />
    </div>
  )
}
