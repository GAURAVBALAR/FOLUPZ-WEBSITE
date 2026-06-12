import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PipelineView({ contacts, setContacts }) {
  const [activeMenuId, setActiveMenuId] = useState(null)

  const columns = [
    { id: 'intro', name: 'Introduction', color: 'bg-indigo-500/10 text-indigo-700 border-indigo-200' },
    { id: 'contact', name: 'Contact Made', color: 'bg-amber-500/10 text-amber-700 border-amber-200' },
    { id: 'nurture', name: 'Nurturing', color: 'bg-purple-500/10 text-purple-700 border-purple-200' },
    { id: 'opportunity', name: 'Opportunity', color: 'bg-sky-500/10 text-sky-700 border-sky-200' },
    { id: 'closed', name: 'Closed', color: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' }
  ]

  // Handler to move a contact to a new stage
  const moveContactStage = (contactId, newStage) => {
    setContacts((prevContacts) =>
      prevContacts.map((c) => {
        if (c.id === contactId) {
          const oldStageName = columns.find((col) => col.id === c.stage)?.name || c.stage
          const newStageName = columns.find((col) => col.id === newStage)?.name || newStage
          
          return {
            ...c,
            stage: newStage,
            lastContacted: new Date().toISOString().split('T')[0],
            timeline: [
              {
                id: `t-${Date.now()}`,
                type: 'pipeline',
                date: new Date().toISOString().split('T')[0],
                text: `Moved stage from ${oldStageName} to ${newStageName}`
              },
              ...c.timeline
            ]
          }
        }
        return c
      })
    )
    setActiveMenuId(null)
  }

  return (
    <div className="p-8 space-y-6 h-screen overflow-y-auto max-h-screen text-slate-800 bg-slate-50">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Visual Pipeline</h1>
        <p className="text-sm text-slate-500">Drag or shift contacts between stages to manage active opportunities.</p>
      </div>

      {/* Kanban Board Layout */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start h-[calc(100vh-180px)] overflow-x-auto min-w-[900px] pb-4">
        {columns.map((col) => {
          const colContacts = contacts.filter((c) => c.stage === col.id)
          return (
            <div
              key={col.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col h-full max-h-[600px]"
            >
              {/* Column header */}
              <div className={`flex justify-between items-center px-3 py-1.5 rounded-xl border mb-4 ${col.color}`}>
                <span className="text-xs font-black tracking-wide uppercase">{col.name}</span>
                <span className="text-xs font-black px-1.5 py-0.5 bg-white/70 rounded-full shadow-sm">
                  {colContacts.length}
                </span>
              </div>

              {/* Cards wrapper */}
              <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                <AnimatePresence mode="popLayout">
                  {colContacts.map((contact) => (
                    <motion.div
                      key={contact.id}
                      layout
                      layoutId={`pipeline-card-${contact.id}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      whileHover={{ y: -2, boxShadow: '0 8px 20px -6px rgba(0,0,0,0.08)' }}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3 relative group"
                    >
                      <div>
                        <h4 className="text-xs font-black text-slate-900">{contact.name}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">{contact.role} @ {contact.company}</p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.slice(0, 2).map((t) => (
                          <span key={t} className="text-[8px] font-bold px-1.5 py-0.5 bg-white border border-slate-200 text-slate-500 rounded">
                            #{t}
                          </span>
                        ))}
                      </div>

                      {/* Bottom actions */}
                      <div className="flex justify-between items-center pt-1.5 border-t border-slate-250/50">
                        <span className="text-[9px] text-slate-400 font-bold">Contacted: {contact.lastContacted}</span>
                        
                        {/* Stage Mover Selector */}
                        <div className="relative">
                          <button
                            onClick={() => setActiveMenuId(activeMenuId === contact.id ? null : contact.id)}
                            className="p-1 hover:bg-slate-200 rounded-full text-slate-500 hover:text-slate-800 transition-colors flex"
                          >
                            <span className="material-symbols-outlined text-sm">swap_horiz</span>
                          </button>

                          {activeMenuId === contact.id && (
                            <>
                              {/* Overlay click catcher */}
                              <div className="fixed inset-0 z-20" onClick={() => setActiveMenuId(null)} />
                              
                              <div className="absolute right-0 bottom-full mb-1.5 bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-1.5 z-30 w-36 space-y-1">
                                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest px-2 py-0.5">Move to stage</p>
                                {columns.map((targetCol) => {
                                  if (targetCol.id === col.id) return null
                                  return (
                                    <button
                                      key={targetCol.id}
                                      onClick={() => moveContactStage(contact.id, targetCol.id)}
                                      className="w-full text-left px-2 py-1 text-[10px] font-bold text-slate-350 hover:bg-indigo-600 hover:text-white rounded-md transition-colors block"
                                    >
                                      {targetCol.name}
                                    </button>
                                  )
                                })}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {colContacts.length === 0 && (
                  <div className="h-full min-h-[120px] flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-xs text-slate-400 italic">
                    Stage empty
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
