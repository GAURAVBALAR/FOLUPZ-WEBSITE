import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MiniPhoneMockup() {
  const [screen, setScreen] = useState('home') // 'home', 'details', 'ai-compose', 'scan', 'voice'
  const [contacts, setContacts] = useState([
    { id: '1', initials: 'M', name: 'Michael Chang', role: 'Designer @ Aura Studio', howMet: 'Met at Design Meetup', active: false },
    { id: '2', initials: 'E', name: 'Elena Rodriguez', role: 'Founder, TechStart', howMet: 'Panel discussion Austin', active: false },
    { id: '3', initials: 'SJ', name: 'Sarah Jenkins', role: 'Lead Architect, NextGen', howMet: 'TechCrunch Disrupt', active: true }
  ])
  
  // OCR Scan variables
  const [scanningCard, setScanningCard] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)

  // Voice recording variables
  const [recording, setRecording] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [recordProgress, setRecordProgress] = useState(0)

  // AI draft variables
  const [draftText, setDraftText] = useState('')
  const [isTypingDraft, setIsTypingDraft] = useState(false)

  // Simulate scanning progress
  useEffect(() => {
    let interval
    if (scanningCard) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              // Add Marcus to contacts
              setContacts((prevContacts) => [
                { id: '4', initials: 'MV', name: 'Marcus Vance', role: 'VP of Eng @ Vortex Cloud', howMet: 'Card scanned', active: true },
                ...prevContacts
              ])
              setScanningCard(false)
              setScanProgress(0)
              setScreen('home')
            }, 800)
            return 100
          }
          return prev + 10
        })
      }, 150)
    }
    return () => clearInterval(interval)
  }, [scanningCard])

  // Simulate voice recording and transcribing
  useEffect(() => {
    let interval
    if (recording) {
      setTranscription('')
      interval = setInterval(() => {
        setRecordProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setRecording(false)
            setRecordProgress(0)
            // Start transcription typing simulation
            simulateTranscription()
            return 100
          }
          return prev + 5
        })
      }, 150)
    }
    return () => clearInterval(interval)
  }, [recording])

  const simulateTranscription = () => {
    const fullText = "Met Jordan Belfort at Miami Capital mixer. Managing Partner. Follow up next Tuesday."
    let index = 0
    setIsTypingDraft(true)
    const typeInterval = setInterval(() => {
      setTranscription(fullText.substring(0, index + 1))
      index++
      if (index >= fullText.length) {
        clearInterval(typeInterval)
        setIsTypingDraft(false)
        setTimeout(() => {
          // Add Jordan to contacts
          setContacts((prevContacts) => [
            { id: '5', initials: 'JB', name: 'Jordan Belfort', role: 'Partner @ Apex Capital', howMet: 'Voice recorded', active: true },
            ...prevContacts
          ])
          setScreen('home')
        }, 1500)
      }
    }, 45)
  }

  // Simulate AI outreach email drafting
  const triggerAIDraft = () => {
    setScreen('ai-compose')
    setDraftText('')
    setIsTypingDraft(true)
    const emailText = "Hi Sarah, it was great chatting at TechCrunch Disrupt about your distributed database bottlenecks. Let's grab coffee next Tuesday to share our Kubernetes deployment template! - Alex"
    let index = 0
    const typeInterval = setInterval(() => {
      setDraftText(emailText.substring(0, index + 1))
      index++
      if (index >= emailText.length) {
        clearInterval(typeInterval)
        setIsTypingDraft(false)
      }
    }, 25)
  }

  return (
    <motion.div
      className="relative flex-shrink-0 flex flex-col items-center select-none"
      style={{ width: 320, maxWidth: '100%' }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <motion.div
        className="relative z-10 bg-surface-container-lowest rounded-[40px] border-[8px] border-[#313035] shadow-2xl overflow-hidden"
        style={{ width: 280, aspectRatio: '9/19' }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
      >
        {/* Dynamic Screen Content */}
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col justify-between"
            >
              {/* Header */}
              <div className="bg-[#4131a1] text-white px-4 pt-10 pb-4 flex justify-between items-center rounded-b-2xl shadow-md">
                <div>
                  <p className="text-[9px] font-bold opacity-75 tracking-wider uppercase">Good Morning</p>
                  <p className="text-base font-black">Alex</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#7265D5] flex items-center justify-center text-xs font-bold shadow-inner border border-white/25">
                  A
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 p-3 bg-[#f6f2f9] space-y-3.5 overflow-y-auto max-h-[300px]">
                {/* Notification Card */}
                <motion.div
                  className="bg-white p-3 rounded-xl border border-[#c9c4d5] shadow-sm cursor-pointer hover:border-[#7265D5] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setScreen('details')}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="material-symbols-outlined text-[#4131a1] text-base animate-pulse">notifications_active</span>
                    <span className="text-[10px] font-extrabold text-[#1c1b20]">Follow Up Required</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-extrabold text-[#1c1b20]">Sarah Jenkins</p>
                      <p className="text-[10px] text-[#474553]">Met at TechCrunch Disrupt</p>
                    </div>
                    <motion.div
                      className="p-1.5 bg-[#7265D5]/20 text-[#4131a1] rounded-full"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* AI Suggestion */}
                <motion.div
                  className="bg-[#E8E4F8] p-3 rounded-xl border border-[#7265D5]/25 cursor-pointer hover:bg-[#ded9f5] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={triggerAIDraft}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-[#4131a1] text-base">auto_awesome</span>
                    <span className="text-[10px] font-bold text-[#4131a1]">AI Suggestion</span>
                  </div>
                  <p className="text-[10px] text-[#474553] leading-relaxed">
                    Write a follow-up note to Sarah about kubernetes bottlenecks.
                  </p>
                </motion.div>

                {/* Contacts List */}
                <div>
                  <p className="text-[9px] font-extrabold text-[#474553] mb-2 px-1 tracking-wider uppercase">Recent Contacts</p>
                  <div className="space-y-1.5">
                    {contacts.map((c) => (
                      <motion.div
                        key={c.id}
                        layoutId={`contact-${c.id}`}
                        className="bg-white p-2.5 rounded-lg border border-[#c9c4d5] flex items-center justify-between hover:border-[#7265D5]/50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#f1ecf6] flex items-center justify-center text-[#474553] font-black text-xs border border-slate-100">
                            {c.initials}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#1c1b20]">{c.name}</p>
                            <p className="text-[9px] text-[#474553]">{c.role}</p>
                          </div>
                        </div>
                        {c.active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="bg-white border-t border-[#c9c4d5] px-4 py-3.5 flex justify-between items-center relative">
                <span className="material-symbols-outlined text-[#4131a1] text-base cursor-pointer">home</span>
                <span className="material-symbols-outlined text-[#474553] text-base cursor-pointer">search</span>
                
                {/* Add Floating Button */}
                <div className="relative">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-[#4131a1] text-white flex items-center justify-center -mt-8 shadow-lg ring-4 ring-[#f6f2f9] cursor-pointer"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setScreen('scan')}
                  >
                    <span className="material-symbols-outlined text-base">add</span>
                  </motion.div>
                </div>

                <span className="material-symbols-outlined text-[#474553] text-base cursor-pointer" onClick={() => setScreen('voice')}>mic</span>
                <span className="material-symbols-outlined text-[#474553] text-base cursor-pointer">settings</span>
              </div>
            </motion.div>
          )}

          {/* Details Screen */}
          {screen === 'details' && (
            <motion.div
              key="details"
              initial={{ x: 280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="h-full bg-white flex flex-col justify-between"
            >
              <div className="p-3 border-b border-[#c9c4d5] flex items-center gap-2 bg-[#f6f2f9]">
                <button onClick={() => setScreen('home')} className="p-1 hover:bg-[#e5e1e8] rounded-full">
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                </button>
                <p className="text-xs font-bold text-[#1c1b20]">Contact Details</p>
              </div>

              <div className="flex-1 p-3 overflow-y-auto space-y-4">
                <div className="text-center py-2">
                  <div className="w-12 h-12 rounded-full bg-[#7265D5] text-white text-base font-bold flex items-center justify-center mx-auto mb-2 shadow-md">
                    SJ
                  </div>
                  <h3 className="text-sm font-black text-[#1c1b20]">Sarah Jenkins</h3>
                  <p className="text-[10px] text-[#474553]">Lead Architect @ NextGen Systems</p>
                </div>

                <div className="space-y-2 bg-[#f6f2f9] p-2.5 rounded-xl border border-[#c9c4d5]/50">
                  <div>
                    <span className="text-[8px] font-bold text-[#474553] uppercase block">How we met</span>
                    <p className="text-[10px] text-[#1c1b20]">Met at TechCrunch Disrupt. Discussed AI and Kubernetes bottlenecks.</p>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold text-[#474553] uppercase block">Email</span>
                    <p className="text-[10px] text-[#4131a1] underline">sarah.j@nextgensystems.io</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[8px] font-bold text-[#474553] uppercase block px-1">Timeline</span>
                  <div className="border-l border-[#c9c4d5] ml-2 pl-3 space-y-3 relative">
                    <div className="relative">
                      <span className="absolute -left-[17px] top-0.5 w-2.5 h-2.5 rounded-full bg-[#4131a1] border border-white" />
                      <p className="text-[9px] font-bold text-[#1c1b20]">Met at TechCrunch</p>
                      <p className="text-[8px] text-[#474553]">June 11, 2026</p>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[17px] top-0.5 w-2.5 h-2.5 rounded-full bg-[#7265D5] border border-white" />
                      <p className="text-[9px] font-bold text-[#1c1b20]">Contact Profile Created</p>
                      <p className="text-[8px] text-[#474553]">June 11, 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#f6f2f9] border-t border-[#c9c4d5] flex gap-2">
                <button
                  className="flex-1 py-1.5 bg-[#4131a1] text-white text-[10px] font-bold rounded-lg hover:bg-[#322482]"
                  onClick={triggerAIDraft}
                >
                  Draft Follow Up
                </button>
              </div>
            </motion.div>
          )}

          {/* AI Compose Screen */}
          {screen === 'ai-compose' && (
            <motion.div
              key="ai-compose"
              initial={{ y: 380 }}
              animate={{ y: 0 }}
              exit={{ y: 380 }}
              className="h-full bg-white flex flex-col justify-between"
            >
              <div className="p-3 border-b border-[#c9c4d5] flex items-center justify-between bg-[#f6f2f9]">
                <div className="flex items-center gap-2">
                  <button onClick={() => setScreen('home')} className="p-1 hover:bg-[#e5e1e8] rounded-full">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                  </button>
                  <p className="text-xs font-bold text-[#1c1b20]">AI Outreach Writer</p>
                </div>
                {isTypingDraft && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
                )}
              </div>

              <div className="flex-1 p-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-[#474553] uppercase">Recipient</span>
                    <span className="text-[9px] text-[#4131a1] font-bold">Sarah Jenkins</span>
                  </div>
                  <div className="p-3 bg-[#f6f2f9] border border-[#c9c4d5] rounded-xl min-h-[160px] text-[10px] text-[#1c1b20] font-mono leading-relaxed whitespace-pre-wrap select-text selection:bg-[#7265D5] selection:text-white">
                    {draftText || "Analyzing conversation context..."}
                    {isTypingDraft && <span className="inline-block w-1 h-3.5 bg-[#7265D5] ml-0.5 animate-pulse" />}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex gap-2 justify-end">
                    <button
                      className="px-2.5 py-1 bg-[#f1ecf6] border border-[#c9c4d5] text-[#474553] text-[9px] font-bold rounded-md"
                      onClick={() => setScreen('home')}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-3 py-1 bg-[#4131a1] text-white text-[9px] font-bold rounded-md flex items-center gap-1 shadow-sm disabled:opacity-50"
                      disabled={isTypingDraft}
                      onClick={() => {
                        alert("Draft copied to clipboard!")
                        setScreen('home')
                      }}
                    >
                      <span className="material-symbols-outlined text-[10px]">content_copy</span>
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Scanner Screen */}
          {screen === 'scan' && (
            <motion.div
              key="scan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full bg-slate-900 text-white flex flex-col justify-between"
            >
              <div className="p-3 flex items-center gap-2 border-b border-white/10 bg-slate-950">
                <button onClick={() => setScreen('home')} className="p-1 hover:bg-white/10 rounded-full text-white">
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                </button>
                <p className="text-xs font-bold">Scan Business Card</p>
              </div>

              <div className="flex-1 p-3 flex flex-col items-center justify-center relative">
                {!scanningCard ? (
                  <div className="text-center space-y-4">
                    <p className="text-[10px] text-slate-400">Select a business card below to simulate OCR scanning.</p>
                    
                    <motion.div
                      className="w-48 aspect-[1.6] bg-gradient-to-br from-slate-800 to-indigo-950 rounded-xl p-3 border border-white/15 shadow-2xl text-left cursor-pointer relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setScanningCard(true)}
                    >
                      <div className="absolute top-2 right-2 text-indigo-400 text-xs">🌀</div>
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <p className="text-[10px] font-bold leading-tight">Marcus Vance</p>
                          <p className="text-[7px] text-slate-400 leading-tight">VP of Engineering</p>
                        </div>
                        <div className="text-[6px] text-slate-500 leading-none">
                          <p>Vortex Cloud Inc.</p>
                          <p>marcus.vance@vortexcloud.com</p>
                        </div>
                      </div>
                    </motion.div>

                    <button
                      className="px-4 py-2 bg-indigo-600 rounded-full text-[10px] font-bold shadow-md inline-flex items-center gap-1 mx-auto"
                      onClick={() => setScanningCard(true)}
                    >
                      <span className="material-symbols-outlined text-[12px]">photo_camera</span>
                      Simulate Scan
                    </button>
                  </div>
                ) : (
                  <div className="relative w-48 aspect-[1.6] bg-gradient-to-br from-slate-800 to-indigo-950 rounded-xl p-3 border border-white/15 overflow-hidden">
                    {/* Laser scanning bar */}
                    <motion.div
                      className="absolute left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)] z-20 pointer-events-none"
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    />
                    <div className="h-full flex flex-col justify-between opacity-50">
                      <div>
                        <p className="text-[10px] font-bold">Marcus Vance</p>
                        <p className="text-[7px]">VP of Engineering</p>
                      </div>
                      <div className="text-[6px]">
                        <p>Vortex Cloud Inc.</p>
                        <p>marcus.vance@vortexcloud.com</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] flex items-center justify-center">
                      <p className="text-xs font-black tracking-widest text-emerald-400 uppercase">Scanning {scanProgress}%</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-950 text-center text-[8px] text-slate-500">
                OCR Scanner digitizes name, email, and social profiles instantly.
              </div>
            </motion.div>
          )}

          {/* Voice Memo Screen */}
          {screen === 'voice' && (
            <motion.div
              key="voice"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full bg-slate-900 text-white flex flex-col justify-between"
            >
              <div className="p-3 flex items-center gap-2 border-b border-white/10 bg-slate-950">
                <button onClick={() => setScreen('home')} className="p-1 hover:bg-white/10 rounded-full text-white">
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                </button>
                <p className="text-xs font-bold">Meeting Voice Recorder</p>
              </div>

              <div className="flex-1 p-3 flex flex-col items-center justify-center space-y-4">
                {recording ? (
                  <div className="text-center space-y-4 w-full">
                    {/* Ripple voice waves */}
                    <div className="flex justify-center items-center gap-1 h-8">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-red-500 rounded-full"
                          animate={{ height: [8, 28, 8] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.6 + i * 0.1,
                            ease: 'easeInOut'
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] text-red-400 font-bold">Listening... ({recordProgress}%)</p>
                    
                    <button
                      className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg mx-auto"
                      onClick={() => setRecording(false)}
                    >
                      <span className="material-symbols-outlined text-base">stop</span>
                    </button>
                  </div>
                ) : transcription ? (
                  <div className="w-full space-y-3 px-2">
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">AI Transcription</p>
                    <div className="p-3 bg-slate-950 border border-white/10 rounded-lg text-[10px] text-slate-100 font-mono leading-relaxed min-h-[80px]">
                      {transcription}
                      {isTypingDraft && <span className="inline-block w-1.5 h-3 bg-red-400 ml-0.5 animate-pulse" />}
                    </div>
                    <p className="text-[8px] text-emerald-400 text-center">Creating contact profile for Jordan Belfort...</p>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
                      <span className="material-symbols-outlined text-red-500 text-2xl animate-pulse">mic</span>
                    </div>
                    <p className="text-[10px] text-slate-400 max-w-[180px] mx-auto leading-relaxed">
                      Dictate notes immediately after a meeting and let AI do the rest.
                    </p>
                    
                    <button
                      className="px-4 py-2 bg-red-600 rounded-full text-[10px] font-bold shadow-md inline-flex items-center gap-1 mx-auto"
                      onClick={() => setRecording(true)}
                    >
                      <span className="material-symbols-outlined text-[12px]">fiber_manual_record</span>
                      Start Dictation
                    </button>
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-950 text-center text-[8px] text-slate-500">
                Transforms spoken notes into CRM fields and calendar reminders.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Shadow layer underneath phone */}
      <motion.div
        className="w-[65%] h-[26px] bg-[#594BBA]/30 rounded-full blur-xl -mt-8 pointer-events-none"
        animate={{ scaleX: [1, 0.75, 1], opacity: [0.6, 0.3, 0.6] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
