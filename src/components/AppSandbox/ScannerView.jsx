import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sampleCards } from '../../data/mockContacts'

export default function ScannerView({ contacts, setContacts, setCurrentTab, onSelectContact }) {
  const [selectedCard, setSelectedCard] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [extractedContact, setExtractedContact] = useState(null)

  useEffect(() => {
    let interval
    if (scanning) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              // Extract card info
              setExtractedContact({
                name: selectedCard.name,
                role: selectedCard.role,
                company: selectedCard.company,
                email: selectedCard.email,
                phone: selectedCard.phone,
                location: selectedCard.location,
                howWeMet: `Scanned card of ${selectedCard.name} at a recent meeting. VP/Director at ${selectedCard.company}.`,
                notes: `Digitized via OCR Scanner.`,
                stage: 'intro',
                lastContacted: new Date().toISOString().split('T')[0],
                followUpDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                tags: ['Scanned', selectedCard.company.split(' ')[0]],
                timeline: [
                  { id: `t-${Date.now()}`, type: 'scan', date: new Date().toISOString().split('T')[0], text: 'Contact card digitized via OCR Scanner' }
                ]
              })
              setScanning(false)
              setProgress(0)
            }, 600)
            return 100
          }
          return prev + 10
        })
      }, 150)
    }
    return () => clearInterval(interval)
  }, [scanning, selectedCard])

  const handleSaveContact = () => {
    if (!extractedContact) return
    const id = `contact-${Date.now()}`
    const finalContact = { ...extractedContact, id }
    setContacts([finalContact, ...contacts])
    onSelectContact(id)
    setCurrentTab('contacts')
    setSelectedCard(null)
    setExtractedContact(null)
  }

  return (
    <div className="p-8 space-y-6 h-screen overflow-y-auto max-h-screen text-slate-800 bg-slate-50">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">OCR Card Scanner</h1>
        <p className="text-sm text-slate-500 font-medium">Instantly extract contact profiles from physical business cards.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side: Selecting & Scan Bay */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          {!selectedCard && !extractedContact && (
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900">1. Select a Sample Card</h3>
              <div className="grid grid-cols-1 gap-4">
                {sampleCards.map((card, i) => (
                  <motion.div
                    key={i}
                    onClick={() => setSelectedCard(card)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 shadow-md border border-slate-200 cursor-pointer flex justify-between h-36 relative overflow-hidden`}
                  >
                    <div className="absolute top-4 right-4 text-2xl opacity-60">{card.logo}</div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-black tracking-wide leading-tight">{card.name}</h4>
                        <p className="text-[10px] opacity-75">{card.role}</p>
                      </div>
                      <div className="text-[9px] opacity-60 leading-normal">
                        <p className="font-bold">{card.company}</p>
                        <p>{card.email}</p>
                        <p>{card.location}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedCard && !extractedContact && (
            <div className="space-y-6 text-center">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-900">2. Scanning Bay</h3>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="px-2.5 py-1 bg-slate-100 text-slate-500 hover:bg-slate-250 text-xs font-bold rounded-lg transition-colors"
                >
                  Change Card
                </button>
              </div>

              {/* Laser scanner target */}
              <div className="relative w-72 aspect-[1.6] bg-gradient-to-br from-slate-800 to-indigo-950 rounded-2xl p-6 shadow-2xl mx-auto overflow-hidden border border-white/10">
                {scanning && (
                  <motion.div
                    className="absolute left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,1)] z-20"
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                  />
                )}
                
                <div className={`flex justify-between h-full text-white text-left ${scanning ? 'opacity-30' : ''}`}>
                  <div className="absolute top-4 right-4 text-2xl opacity-60">{selectedCard.logo}</div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-black tracking-wide leading-tight">{selectedCard.name}</h4>
                      <p className="text-[10px] opacity-75">{selectedCard.role}</p>
                    </div>
                    <div className="text-[9px] opacity-60 leading-normal">
                      <p className="font-bold">{selectedCard.company}</p>
                      <p>{selectedCard.email}</p>
                      <p>{selectedCard.location}</p>
                    </div>
                  </div>
                </div>

                {scanning && (
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center space-y-2">
                    <p className="text-emerald-400 text-xs font-black tracking-wider uppercase">Digitizing Fields...</p>
                    <p className="text-white text-[10px] font-bold">{progress}% Completed</p>
                  </div>
                )}
              </div>

              {!scanning && (
                <button
                  onClick={() => setScanning(true)}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">qr_code_scanner</span>
                  Start Laser OCR Scan
                </button>
              )}
            </div>
          )}

          {extractedContact && (
            <div className="space-y-6 text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <span className="material-symbols-outlined text-3xl">done_all</span>
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Scan Complete!</h3>
                <p className="text-xs text-slate-400 mt-1">AI extracted 6 fields with 99.8% confidence score.</p>
              </div>

              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setExtractedContact(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-colors"
                >
                  Scan Another Card
                </button>
                <button
                  onClick={handleSaveContact}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                >
                  Add to Contacts
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Extracted Fields Review Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="text-sm font-black text-slate-900">3. Extracted OCR Fields</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Full Name</label>
                <input
                  type="text"
                  readOnly
                  value={extractedContact ? extractedContact.name : ''}
                  placeholder="Waiting for scan..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-550 cursor-not-allowed focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Job Title</label>
                <input
                  type="text"
                  readOnly
                  value={extractedContact ? extractedContact.role : ''}
                  placeholder="Waiting for scan..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-550 cursor-not-allowed focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Company</label>
                <input
                  type="text"
                  readOnly
                  value={extractedContact ? extractedContact.company : ''}
                  placeholder="Waiting for scan..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-550 cursor-not-allowed focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Location</label>
                <input
                  type="text"
                  readOnly
                  value={extractedContact ? extractedContact.location : ''}
                  placeholder="Waiting for scan..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-550 cursor-not-allowed focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Email Address</label>
              <input
                type="text"
                readOnly
                value={extractedContact ? extractedContact.email : ''}
                placeholder="Waiting for scan..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-550 cursor-not-allowed focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Phone Number</label>
              <input
                type="text"
                readOnly
                value={extractedContact ? extractedContact.phone : ''}
                placeholder="Waiting for scan..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-550 cursor-not-allowed focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
