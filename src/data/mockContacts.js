export const initialContacts = [
  {
    id: 'contact-1',
    name: 'Sarah Jenkins',
    role: 'Lead Architect',
    company: 'NextGen Systems',
    email: 'sarah.j@nextgensystems.io',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    howWeMet: 'Met at TechCrunch Disrupt in SF. Had a 20-minute chat about AI scaling bottleneck and distributed DB databases.',
    notes: 'Very interested in our developer tooling. Mentioned they are migrating from AWS to multi-cloud. Follow up about the Kubernetes templates.',
    stage: 'intro',
    lastContacted: '2026-06-11',
    followUpDate: '2026-06-15',
    tags: ['TechCrunch', 'Developer', 'Enterprise'],
    timeline: [
      { id: 't1', type: 'meet', date: '2026-06-11', text: 'Met at TechCrunch Disrupt' },
      { id: 't2', type: 'note', date: '2026-06-11', text: 'Added context: Interested in developer tools, Kubernetes, AWS migration.' }
    ]
  },
  {
    id: 'contact-2',
    name: 'Michael Chang',
    role: 'Principal Designer',
    company: 'Aura Studio',
    email: 'm.chang@auradesign.com',
    phone: '+1 (555) 043-9821',
    location: 'New York, NY',
    howWeMet: 'Introduced by David at Design Systems Meetup. Discussed creative tech and custom React UI animations.',
    notes: 'LOVED the fluid animations on the landing page! Looking to collaborate on a client website next month.',
    stage: 'nurture',
    lastContacted: '2026-06-08',
    followUpDate: '2026-06-18',
    tags: ['Design', 'Collaborator', 'agency'],
    timeline: [
      { id: 't1', type: 'meet', date: '2026-06-08', text: 'Met at Design Systems Meetup' },
      { id: 't2', type: 'email', date: '2026-06-09', text: 'Sent follow-up email with link to portfolio.' }
    ]
  },
  {
    id: 'contact-3',
    name: 'Elena Rodriguez',
    role: 'Founder',
    company: 'TechStart Ventures',
    email: 'elena@techstart.vc',
    phone: '+1 (555) 088-7711',
    location: 'Austin, TX',
    howWeMet: 'Sat next to each other on the panel discussion about Seed Funding. Talked about B2B SaaS trends.',
    notes: 'Ex-Google PM. Looking for early-stage B2B SaaS startups to invest in. Invited me to pitch when ready.',
    stage: 'opportunity',
    lastContacted: '2026-06-05',
    followUpDate: '2026-06-25',
    tags: ['Investor', 'B2B', 'SaaS'],
    timeline: [
      { id: 't1', type: 'meet', date: '2026-06-05', text: 'Met at Funding Panel' },
      { id: 't2', type: 'note', date: '2026-06-05', text: 'Wrote elevator pitch notes.' },
      { id: 't3', type: 'call', date: '2026-06-10', text: 'Brief 10-minute check-in call.' }
    ]
  },
  {
    id: 'contact-4',
    name: 'David Kojo',
    role: 'Director of Product',
    company: 'ScaleUp Inc.',
    email: 'd.kojo@scaleup.co',
    phone: '+1 (555) 051-4433',
    location: 'Chicago, IL',
    howWeMet: 'Met at Product School networking mixer. Shared insights on user retention and growth hacking.',
    notes: 'Hiring a Senior Frontend Engineer. Wants to see if we know any candidates who fit the description.',
    stage: 'contact',
    lastContacted: '2026-05-28',
    followUpDate: '2026-06-14',
    tags: ['Product', 'Recruiting'],
    timeline: [
      { id: 't1', type: 'meet', date: '2026-05-28', text: 'Met at Mixer' }
    ]
  },
  {
    id: 'contact-5',
    name: 'Dr. Amy Vance',
    role: 'AI Researcher',
    company: 'DeepMind',
    email: 'amyvance@google.com',
    phone: '+44 20 7600 0000',
    location: 'London, UK',
    howWeMet: 'Shared taxi from NeurIPS conference to the airport. Discussed agentic AI workflows and memory reinforcement.',
    notes: 'Fascinated by personal memory augmentation tools. Suggested checking out papers on vector databases.',
    stage: 'closed',
    lastContacted: '2026-05-15',
    followUpDate: '2026-07-01',
    tags: ['AI', 'Research', 'Academic'],
    timeline: [
      { id: 't1', type: 'meet', date: '2026-05-15', text: 'Shared taxi at NeurIPS' },
      { id: 't2', type: 'email', date: '2026-05-16', text: 'Sent thank you email + AI paper links.' }
    ]
  }
]

export const sampleCards = [
  {
    name: 'Marcus Vance',
    role: 'VP of Engineering',
    company: 'Vortex Cloud',
    email: 'marcus.vance@vortexcloud.com',
    phone: '+1 (555) 782-9012',
    location: 'Seattle, WA',
    color: 'from-slate-900 to-indigo-950 text-white',
    logo: '🌀'
  },
  {
    name: 'Chloe Tanaka',
    role: 'Creative Director',
    company: 'Nippon Media Group',
    email: 'c.tanaka@nipponmedia.jp',
    phone: '+81 3 5555 0192',
    location: 'Tokyo, Japan',
    color: 'from-amber-50 to-orange-100 text-slate-800 border border-orange-200',
    logo: '🏮'
  },
  {
    name: 'Jordan Belfort',
    role: 'Managing Partner',
    company: 'Apex Capital',
    email: 'jordan@apexcap.co',
    phone: '+1 (555) 911-3000',
    location: 'Miami, FL',
    color: 'from-emerald-900 to-teal-950 text-white',
    logo: '🔱'
  }
]
