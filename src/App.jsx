import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LandingPage from './components/LandingPage'
import Sidebar from './components/AppSandbox/Sidebar'
import DashboardView from './components/AppSandbox/DashboardView'
import ContactsView from './components/AppSandbox/ContactsView'
import PipelineView from './components/AppSandbox/PipelineView'
import ScannerView from './components/AppSandbox/ScannerView'
import RecorderView from './components/AppSandbox/RecorderView'
import { initialContacts } from './data/mockContacts'
import './App.css'

function App() {
  const [viewMode, setViewMode] = useState('landing') // 'landing' | 'app'
  const [currentTab, setCurrentTab] = useState('dashboard') // 'dashboard' | 'contacts' | 'pipeline' | 'scanner' | 'dictator'
  const [contacts, setContacts] = useState(initialContacts)
  const [selectedContactId, setSelectedContactId] = useState('contact-1')

  return (
    <AnimatePresence mode="wait">
      {viewMode === 'landing' ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <LandingPage setViewMode={setViewMode} />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="flex h-screen w-screen bg-slate-50 overflow-hidden font-sans"
        >
          <Sidebar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            setViewMode={setViewMode}
          />
          <div className="flex-1 h-full overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="h-full w-full"
              >
                {currentTab === 'dashboard' && (
                  <DashboardView
                    contacts={contacts}
                    onSelectContact={setSelectedContactId}
                    setCurrentTab={setCurrentTab}
                  />
                )}
                {currentTab === 'contacts' && (
                  <ContactsView
                    contacts={contacts}
                    setContacts={setContacts}
                    selectedContactId={selectedContactId}
                    onSelectContact={setSelectedContactId}
                  />
                )}
                {currentTab === 'pipeline' && (
                  <PipelineView
                    contacts={contacts}
                    setContacts={setContacts}
                  />
                )}
                {currentTab === 'scanner' && (
                  <ScannerView
                    contacts={contacts}
                    setContacts={setContacts}
                    setCurrentTab={setCurrentTab}
                    onSelectContact={setSelectedContactId}
                  />
                )}
                {currentTab === 'dictator' && (
                  <RecorderView
                    contacts={contacts}
                    setContacts={setContacts}
                    setCurrentTab={setCurrentTab}
                    onSelectContact={setSelectedContactId}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
