import { motion } from 'framer-motion'

export default function DashboardView({ contacts, onSelectContact, setCurrentTab }) {
  // Compute dashboard metrics
  const totalContacts = contacts.length
  const opportunities = contacts.filter((c) => c.stage === 'opportunity').length
  const closedDeals = contacts.filter((c) => c.stage === 'closed').length
  
  // Followups due (e.g. within next few days)
  const followUpsDue = contacts.filter((c) => {
    const today = new Date('2026-06-12')
    const followUp = new Date(c.followUpDate)
    return followUp <= today || (followUp - today) / (1000 * 60 * 60 * 24) <= 3
  }).length

  // Quick action: jump to contact's AI drafting composer
  const handleOutreachAction = (contactId) => {
    onSelectContact(contactId)
    setCurrentTab('contacts')
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  }

  // Sample data points for animated chart
  const dataPoints = [30, 45, 35, 60, 72, 88, 70, 95]
  const svgWidth = 500
  const svgHeight = 150
  const points = dataPoints.map((val, idx) => {
    const x = (idx / (dataPoints.length - 1)) * svgWidth
    const y = svgHeight - (val / 100) * svgHeight
    return `${x},${y}`
  }).join(' ')

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 space-y-8 overflow-y-auto h-full max-h-screen text-slate-800"
    >
      {/* Welcome header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Dashboard Command</h1>
          <p className="text-sm text-slate-500">Here is the status of your networking relationships today.</p>
        </div>
        <div className="bg-slate-100 px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-600">
          📍 Current Date: June 12, 2026
        </div>
      </div>

      {/* Stats Cards */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Network', val: totalContacts, desc: 'Contacts saved', color: 'border-l-4 border-indigo-600', icon: 'groups' },
          { title: 'Follow-Ups Due', val: followUpsDue, desc: 'Need attention soon', color: 'border-l-4 border-amber-500', icon: 'notifications_active' },
          { title: 'Opportunities', val: opportunities, desc: 'Active discussions', color: 'border-l-4 border-sky-500', icon: 'trending_up' },
          { title: 'Closed Deals', val: closedDeals, desc: 'Converted accounts', color: 'border-l-4 border-emerald-500', icon: 'check_circle' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
            className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between ${stat.color}`}
          >
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.val}</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">{stat.desc}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Grid: Chart & Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Connection health chart */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2 space-y-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-black text-slate-900">Network Engagement Index</h2>
              <p className="text-xs text-slate-400">Weekly active outreach interactions</p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full">
              +14% vs last month
            </span>
          </div>

          <div className="w-full relative h-[160px] flex items-end">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1={svgHeight * 0.25} x2={svgWidth} y2={svgHeight * 0.25} stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1={svgHeight * 0.5} x2={svgWidth} y2={svgHeight * 0.5} stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1={svgHeight * 0.75} x2={svgWidth} y2={svgHeight * 0.75} stroke="#f1f5f9" strokeWidth="1" />

              {/* Area path */}
              <motion.path
                d={`M 0,${svgHeight} L ${points} L ${svgWidth},${svgHeight} Z`}
                fill="url(#chartGlow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />

              {/* Line path */}
              <motion.polyline
                fill="none"
                stroke="#6366f1"
                strokeWidth="3.5"
                points={points}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />

              {/* Interactive Dots */}
              {dataPoints.map((val, idx) => {
                const x = (idx / (dataPoints.length - 1)) * svgWidth
                const y = svgHeight - (val / 100) * svgHeight
                return (
                  <motion.circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r={idx === dataPoints.length - 1 ? 5 : 3.5}
                    fill={idx === dataPoints.length - 1 ? '#6366f1' : '#ffffff'}
                    stroke="#6366f1"
                    strokeWidth="2.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + idx * 0.05 }}
                  />
                )
              })}
            </svg>
          </div>

          <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1 pt-2">
            <span>May 01</span>
            <span>May 08</span>
            <span>May 15</span>
            <span>May 22</span>
            <span>May 29</span>
            <span>Jun 05</span>
            <span>Jun 12</span>
          </div>
        </motion.div>

        {/* Action reminders */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-black text-slate-900">Action Required Today</h2>
              <p className="text-xs text-slate-400">Keep these connections from going cold</p>
            </div>

            <div className="space-y-3 max-h-[220px] overflow-y-auto">
              {contacts.slice(0, 3).map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-600/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-xs text-indigo-600">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{contact.name}</p>
                      <p className="text-[10px] text-slate-400">Follow up due {contact.followUpDate}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOutreachAction(contact.id)}
                    className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-full transition-colors flex"
                    title="Write AI follow up"
                  >
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentTab('contacts')}
            className="w-full mt-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-colors text-center block border border-slate-200"
          >
            View All Contacts
          </button>
        </motion.div>
      </div>

      {/* Recent Activity Timeline */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-black text-slate-900">Recent Networking Activity</h2>
          <p className="text-xs text-slate-400 font-medium">Chronological logs of your interactions</p>
        </div>

        <div className="space-y-4 relative border-l border-slate-200 ml-4 pl-6 py-2">
          {contacts.flatMap(c => c.timeline.map(t => ({ ...t, contactName: c.name, contactId: c.id }))).slice(0, 4).map((activity, idx) => (
            <div key={idx} className="relative group">
              <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-50 border-2 border-indigo-600 flex items-center justify-center shadow-sm z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              </span>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-slate-900 cursor-pointer hover:text-indigo-600" onClick={() => handleOutreachAction(activity.contactId)}>
                    {activity.contactName}
                  </span>
                  <span className="text-xs text-slate-500"> - {activity.text}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold">{activity.date}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
