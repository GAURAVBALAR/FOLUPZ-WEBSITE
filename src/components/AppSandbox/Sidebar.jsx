import { motion } from 'framer-motion'

export default function Sidebar({ currentTab, setCurrentTab, setViewMode }) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'dashboard' },
    { id: 'contacts', name: 'Contacts Directory', icon: 'group' },
    { id: 'pipeline', name: 'Visual Pipeline', icon: 'view_kanban' },
    { id: 'scanner', name: 'Card Scanner', icon: 'photo_camera' },
    { id: 'dictator', name: 'Voice Notes', icon: 'mic' }
  ]

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col justify-between h-screen sticky top-0">
      <div className="flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-base">F</span>
            <span className="text-white font-black text-lg tracking-tight">Folupz</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-900/50 text-indigo-400 border border-indigo-700/50">SANDBOX</span>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const active = currentTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all relative ${
                  active ? 'text-white' : 'hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 bg-indigo-600 rounded-xl z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="material-symbols-outlined text-xl relative z-10">{item.icon}</span>
                <span className="relative z-10">{item.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Return to Landing Page */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <div className="bg-indigo-950/40 border border-indigo-800/30 rounded-xl p-3.5 text-center">
          <p className="text-xs text-indigo-200 font-bold mb-1">Simulated CRM Sandbox</p>
          <p className="text-[10px] text-slate-500 leading-normal">
            Try the core features live. All data is saved in local browser state.
          </p>
        </div>

        <button
          onClick={() => setViewMode('landing')}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Exit Sandbox App
        </button>
      </div>
    </div>
  )
}
