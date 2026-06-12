import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function RecorderView({ contacts, setContacts, setCurrentTab, onSelectContact }) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordTime, setRecordTime] = useState(0)
  const [transcript, setTranscript] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [extractedContact, setExtractedContact] = useState(null)

  // Timer simulation
  useEffect(() => {
    let interval
    if (isRecording) {
      interval = setInterval(() => {
        setRecordTime((prev) => {
          if (prev >= 6) {
            // Automatically stop recording after 6 seconds for demo purposes
            setIsRecording(false)
            setRecordTime(0)
            simulateTranscription()
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const simulateTranscription = () => {
    setIsTyping(true)
    setTranscript('')
    const noteText = "Met Chloe Tanaka, Creative Director at Nippon Media Group. We met at the Tokyo Design Lab, discussing high-end UI animations. Need to follow up next Monday."
    
    let index = 0
    const typeInterval = setInterval(() => {
      setTranscript(noteText.substring(0, index + 1))
      index++
      if (index >= noteText.length) {
        clearInterval(typeInterval)
        setIsTyping(false)
        
        // Populate mock extracted contact
        setExtractedContact({
          name: 'Chloe Tanaka',
          role: 'Creative Director',
          company: 'Nippon Media Group',
          email: 'c.tanaka@nipponmedia.jp',
          phone: '+81 3 5555 0192',
          location: 'Tokyo, Japan',
          howWeMet: 'Met at Tokyo Design Lab, discussing UI animations.',
          notes: 'Wants to collaborate on an interactive website next quarter. Follow up next Monday.',
          stage: 'intro',
          lastContacted: new Date().toISOString().split('T')[0],
          followUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          tags: ['Tokyo', 'Design', 'Creative'],
          timeline: [
            { id: `t-${Date.now()}`, type: 'voice', date: new Date().toISOString().split('T')[0], text: 'Created contact via Voice Note transcription' }
          ]
        })
      }
    }, 25)
  }

  const handleSaveContact = () => {
    if (!extractedContact) return
    const id = `contact-${Date.now()}`
    const finalContact = { ...extractedContact, id }
    setContacts([finalContact, ...contacts])
    onSelectContact(id)
    setCurrentTab('contacts')
    setTranscript('')
    setExtractedContact(null)
  }

  return (
    <div className="p-8 space-y-6 h-screen overflow-y-auto max-h-screen text-slate-800 bg-slate-50">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Voice Note Recorder</h1>
        <p className="text-sm text-slate-500 font-medium">Dictate context right after a meeting and let AI create the connection profile.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side: Recording Console */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[350px] space-y-6 relative overflow-hidden">
          {/* Background ripples when recording */}
          {isRecording && (
            <>
              <motion.div
                className="absolute w-64 h-64 rounded-full border border-red-500/20 pointer-events-none"
                animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute w-64 h-64 rounded-full border border-red-500/15 pointer-events-none"
                animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeOut', delay: 0.6 }}
              />
            </>
          )}

          <div className="text-center space-y-2 relative z-10">
            <h3 className="text-sm font-black text-slate-900">
              {isRecording ? 'Listening and Analysing...' : '1. Record Voice Memo'}
            </h3>
            <p className="text-xs text-slate-400">
              {isRecording ? `00:0${recordTime} / 00:06` : 'Tap the microphone to dictate your check-in'}
            </p>
          </div>

          {/* Microphone button */}
          <div className="relative z-10">
            <motion.button
              onClick={() => {
                if (isRecording) {
                  setIsRecording(false)
                  setRecordTime(0)
                  simulateTranscription()
                } else {
                  setExtractedContact(null)
                  setTranscript('')
                  setIsRecording(true)
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${
                isRecording ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <span className="material-symbols-outlined text-3xl">
                {isRecording ? 'stop' : 'mic'}
              </span>
            </motion.button>
          </div>

          {/* Soundwaves visualizer */}
          {isRecording && (
            <div className="flex gap-1 h-8 items-center">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-red-500 rounded-full"
                  animate={{ height: [8, 32, 8] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.5 + i * 0.08,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>
          )}

          {transcript && (
            <div className="w-full space-y-2 px-2 text-left relative z-10">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Transcription</h4>
              <div className="p-4 bg-slate-950 border border-slate-900 text-slate-200 font-mono text-[11px] leading-relaxed rounded-xl min-h-[100px] whitespace-pre-wrap">
                {transcript}
                {isTyping && <span className="inline-block w-1.5 h-3.5 bg-red-400 ml-0.5 animate-pulse" />}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: AI Context Parsing Review */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="text-sm font-black text-slate-900">2. AI Parsed Details</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Name Extracted</label>
                <input
                  type="text"
                  readOnly
                  value={extractedContact ? extractedContact.name : ''}
                  placeholder="Waiting for audio transcript..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-550 cursor-not-allowed focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Extracted Company</label>
                <input
                  type="text"
                  readOnly
                  value={extractedContact ? extractedContact.company : ''}
                  placeholder="Waiting for audio transcript..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-550 cursor-not-allowed focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Key Action Items</label>
              <textarea
                readOnly
                rows={2}
                value={extractedContact ? extractedContact.notes : ''}
                placeholder="Waiting for audio transcript..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-550 cursor-not-allowed focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Suggested Follow-Up Date</label>
              <input
                type="text"
                readOnly
                value={extractedContact ? extractedContact.followUpDate : ''}
                placeholder="Waiting for audio transcript..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-550 cursor-not-allowed focus:outline-none"
              />
            </div>

            {extractedContact && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleSaveContact}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
              >
                Add Extracted Contact Profile
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
