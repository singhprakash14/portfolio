export const env = {
  // Personal & Site Info
  siteName: import.meta.env.VITE_SITE_NAME || 'Prakash Singh',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://singhprakash14.github.io',
  role: import.meta.env.VITE_ROLE || 'Full Stack Developer',
  location: import.meta.env.VITE_LOCATION || 'Kalyan, India',
  locationDetail:
    import.meta.env.VITE_LOCATION_DETAIL || 'Kalyan, India (UTC+5:30)',
  phone: import.meta.env.VITE_PHONE || '+91 9307324014',
  resumeUrl: import.meta.env.VITE_RESUME_URL || '/resume.pdf',

  // Contact & Social Links
  email: import.meta.env.VITE_EMAIL || 'prakashsingh12320@gmail.com',
  githubUrl:
    import.meta.env.VITE_GITHUB_URL || 'https://github.com/singhprakash14',
  linkedinUrl: import.meta.env.VITE_LINKEDIN_URL || '',
  twitterHandle: import.meta.env.VITE_TWITTER_HANDLE || '',

  // Cal.com Meeting Booking (optional)
  calLink: import.meta.env.VITE_CAL_LINK || '',
  calNamespace: import.meta.env.VITE_CAL_NAMESPACE || '30min',

  // Project Live / Demo Links
  projectLinks: {
    diamondAtelier:
      import.meta.env.VITE_PROJECT_DIAMOND_URL ||
      'https://www.diamondforest.com/',
  },

  // SEO & Headings
  shortTitle:
    import.meta.env.VITE_SHORT_TITLE ||
    'Prakash Singh — Full Stack Developer',
  title:
    import.meta.env.VITE_TITLE ||
    'Prakash Singh — Full Stack Developer',
  description:
    import.meta.env.VITE_DESCRIPTION ||
    'Full Stack Web Developer with expertise in JavaScript and the MERN stack. Building scalable APIs, responsive storefronts, and production systems at Diamond Atelier.',
}
