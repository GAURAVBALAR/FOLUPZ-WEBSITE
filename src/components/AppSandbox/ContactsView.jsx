import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContactsView({ contacts, setContacts, selectedContactId, onSelectContact }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)
  
  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newContact, setNewContact] = useState({
    name: '', role: '', company: '', email: '', phone: '', location: '', howWeMet: '', notes: '', tagsString: ''
  })

  // AI draft state
  const [aiTone, setAiTone] = useState('friendly') // 'friendly', 'professional', 'pitch'
  const [aiLength, setAiLength] = useState('medium') // 'short', 'medium', 'long'
  const [aiDraft, setAiDraft] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  // Retrieve current selected contact object
  const contact = contacts.find((c) => c.id === selectedContactId) || contacts[0]

  useEffect(() => {
    if (contact) {
      setAiDraft('')
    }
  }, [selectedContactId, contact])

  // Extract all tags from contacts list
  const allTags = Array.from(new Set(contacts.flatMap((c) => c.tags || [])))

  // Filter contacts list based on search and tags
  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.howWeMet.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesTag = selectedTag ? c.tags.includes(selectedTag) : true
    
    return matchesSearch && matchesTag
  })

  // Add new contact handler
  const handleAddContact = (e) => {
    e.preventDefault()
    if (!newContact.name) return

    const tagsArray = newContact.tagsString
      ? newContact.tagsString.split(',').map((t) => t.trim()).filter(Boolean)
      : []

    const added = {
      id: `contact-${Date.now()}`,
      name: newContact.name,
      role: newContact.role || 'Professional',
      company: newContact.company || 'Self-Employed',
      email: newContact.email || 'n/a',
      phone: newContact.phone || 'n/a',
      location: newContact.location || 'Unknown',
      howWeMet: newContact.howWeMet || 'Met recently.',
      notes: newContact.notes || '',
      stage: 'intro',
      lastContacted: new Date().toISOString().split('T')[0],
      followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      tags: tagsArray,
      timeline: [
        { id: `t-${Date.now()}`, type: 'meet', date: new Date().toISOString().split('T')[0], text: 'Profile created manually' }
      ]
    }

    setContacts([added, ...contacts])
    onSelectContact(added.id)
    setIsAddModalOpen(false)
    setNewContact({ name: '', role: '', company: '', email: '', phone: '', location: '', howWeMet: '', notes: '', tagsString: '' })
  }

  // AI draft generator
  const generateAIDraft = () => {
    if (!contact) return
    setIsGenerating(true)
    setAiDraft('')

    let draftText = ''
    if (aiTone === 'friendly') {
      draftText = `Hi ${contact.name.split(' ')[0]},\n\nIt was great meeting you recently! I really enjoyed our conversation about ${contact.howWeMet.includes('bottleneck') ? 'kubernetes bottlenecks' : 'creative technologies'}.\n\nI'd love to stay connected and maybe grab a quick call or coffee sometime next week to chat more. Let me know if you have any availability!\n\nBest,\nAlex`
    } else if (aiTone === 'professional') {
      draftText = `Dear ${contact.name},\n\nI am writing to follow up on our discussion regarding ${contact.howWeMet.includes('bottleneck') ? 'distributed databases' : 'industry developments'}. I found your insights very valuable.\n\nI would welcome the opportunity to discuss how we might collaborate on future projects. Please let me know if you have 15 minutes for a brief call next week.\n\nSincerely,\nAlex`
    } else {
      draftText = `Hey ${contact.name.split(' ')[0]},\n\nHope you are doing well! Following up on our chat about B2B SaaS. We are building something exciting in the developer CRM space that aligns perfectly with what we discussed.\n\nI would love to give you a quick 5-minute preview of the tool and get your expert feedback. Let me know if we can schedule a quick Zoom call!\n\nCheers,\nAlex`
    }

    if (aiLength === 'short') {
      draftText = draftText.split('\n\n').slice(0, 2).join('\n\n') + '\n\nBest, Alex'
    } else if (aiLength === 'long') {
      draftText += `\n\nP.S. I also checked out your website and was really impressed by the work you guys are doing. Looking forward to keeping in touch.`
    }

    // Animate typing letter by letter
    let index = 0
    const typeInterval = setInterval(() => {
      setAiDraft(draftText.substring(0, index + 1))
      index++
      if (index >= draftText.length) {
        clearInterval(typeInterval)
        setIsGenerating(false)
      }
    }, 15)
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-800">
      {/* Left List Pane (1/3 width) */}
      <div className="w-1/3 border-r border-slate-200 bg-white flex flex-col h-full">
        {/* Search header */}
        <div className="p-4 border-b border-slate-200 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-black text-slate-900">Connections</h2>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm transition-colors"
            >
              <span className="material-symbols-outlined text-sm">person_add</span>
              Add New
            </button>
          </div>

          <div className="relative">
            <span className="absolute left-3 top-2.5 material-symbols-outlined text-slate-400 text-sm">search</span>
            <input
              type="text"
              placeholder="Search contacts, how we met..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-indigo-600"
            />
          </div>

          {/* Tags list */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 max-h-[80px]">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-2 py-1 rounded-full text-[10px] font-bold border ${
                !selectedTag ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-2 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                  selectedTag === tag ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-500'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Contacts list */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          <AnimatePresence mode="popLayout">
            {filteredContacts.map((c) => {
              const isSelected = selectedContactId === c.id
              return (
                <motion.div
                  key={c.id}
                  layoutId={`contact-card-${c.id}`}
                  onClick={() => onSelectContact(c.id)}
                  className={`p-4 cursor-pointer flex items-center justify-between transition-colors ${
                    isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-sm text-indigo-600 shadow-inner">
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900">{c.name}</h4>
                      <p className="text-[10px] text-slate-500">{c.role} @ {c.company}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400">{c.lastContacted}</span>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Detail Pane (2/3 width) */}
      <div className="w-2/3 bg-slate-50 h-full flex flex-col overflow-y-auto">
        {contact ? (
          <div className="p-8 space-y-6">
            {/* Header profile */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-indigo-600 text-white text-lg font-black flex items-center justify-center shadow-lg">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h1 className="text-lg font-black text-slate-900">{contact.name}</h1>
                  <p className="text-xs text-slate-500 font-bold">{contact.role} @ <span className="text-indigo-600">{contact.company}</span></p>
                  <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">location_on</span>
                    {contact.location}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">mail</span>
                  {contact.email}
                </div>
                <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">phone</span>
                  {contact.phone}
                </div>
              </div>
            </div>

            {/* Grid details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">How We Met</h3>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">{contact.howWeMet}</p>
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Key Notes</h3>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">{contact.notes || "No notes added yet."}</p>
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1.5">Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {contact.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-md text-[9px] font-bold">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Outreach composer */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">AI Follow-Up Copywriter</h3>
                      <p className="text-[10px] text-slate-400">Generate context-based outreach templates</p>
                    </div>
                    <span className="material-symbols-outlined text-indigo-600 text-base">auto_awesome</span>
                  </div>

                  {/* AI Controls */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Tone</span>
                      <select
                        value={aiTone}
                        onChange={(e) => setAiTone(e.target.value)}
                        className="w-full text-[10px] bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none"
                      >
                        <option value="friendly">Friendly check-in</option>
                        <option value="professional">Professional follow-up</option>
                        <option value="pitch">Quick pitch / meeting</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Length</span>
                      <div className="flex border border-slate-200 rounded-lg overflow-hidden text-[9px]">
                        {['short', 'medium', 'long'].map((len) => (
                          <button
                            key={len}
                            onClick={() => setAiLength(len)}
                            className={`flex-1 py-1.5 font-bold uppercase transition-colors ${
                              aiLength === len ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-500'
                            }`}
                          >
                            {len[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AI Output */}
                  <div className="relative min-h-[140px] bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-[10px] text-slate-200 font-mono leading-relaxed select-text whitespace-pre-wrap">
                    {aiDraft || (
                      <span className="text-slate-500 italic">Configure controls and click Generate Draft above.</span>
                    )}
                    {isGenerating && (
                      <span className="inline-block w-1.5 h-3.5 bg-indigo-400 ml-0.5 animate-pulse" />
                    )}
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    onClick={generateAIDraft}
                    disabled={isGenerating}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
                    Generate Email
                  </button>
                  {aiDraft && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(aiDraft)
                        alert("Email template copied to clipboard!")
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[13px]">content_copy</span>
                      Copy
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline logs */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Relationship Timeline</h3>
              <div className="relative border-l border-slate-200 ml-3 pl-6 py-2 space-y-4">
                {contact.timeline.map((item) => (
                  <div key={item.id} className="relative">
                    <span className="absolute -left-[30px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center z-10" />
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-xs font-bold text-slate-850">{item.text}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase tracking-wide">Logged via {item.type}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 italic text-sm">
            Select a contact to view details.
          </div>
        )}
      </div>

      {/* Manual Add Contact Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-sm font-black text-slate-900">Add New Connection</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>

              <form onSubmit={handleAddContact} className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-650"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Role / Job Title</label>
                    <input
                      type="text"
                      value={newContact.role}
                      onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                      placeholder="Founder"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-650"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Company</label>
                    <input
                      type="text"
                      value={newContact.company}
                      onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                      placeholder="Stripe"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-650"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Location</label>
                    <input
                      type="text"
                      value={newContact.location}
                      onChange={(e) => setNewContact({ ...newContact, location: e.target.value })}
                      placeholder="New York, NY"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-650"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Email</label>
                    <input
                      type="email"
                      value={newContact.email}
                      onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                      placeholder="jane@stripe.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-650"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Phone</label>
                    <input
                      type="text"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-650"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">How We Met (Context)</label>
                  <textarea
                    value={newContact.howWeMet}
                    onChange={(e) => setNewContact({ ...newContact, howWeMet: e.target.value })}
                    placeholder="Describe where and how you met, what you discussed..."
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-650 resize-none"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={newContact.tagsString}
                    onChange={(e) => setNewContact({ ...newContact, tagsString: e.target.value })}
                    placeholder="SaaS, Developer, Investor"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-650"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-500 text-xs font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
                  >
                    Save Connection
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
