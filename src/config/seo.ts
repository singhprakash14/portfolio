import { env } from './env'

export const SITE_CONFIG = {
  name: env.siteName,
  handle: 'singhprakash14',
  shortTitle: env.shortTitle,
  title: env.title,
  description: env.description,
  url: env.siteUrl,
  ogImage: '/og-image.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: `${env.siteName} — ${env.role} Portfolio`,
  twitterHandle: env.twitterHandle,
  author: env.siteName,
  locale: 'en_US',
  links: {
    github: env.githubUrl,
    linkedin: env.linkedinUrl,
    email: `mailto:${env.email}`,
    cal: env.calLink ? `https://cal.com/${env.calLink}` : '',
  },
}

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.url}/#person`,
      name: SITE_CONFIG.name,
      alternateName: 'singhprakash14',
      jobTitle: env.role,
      description: SITE_CONFIG.description,
      url: SITE_CONFIG.url,
      image: `${SITE_CONFIG.url}/apple-touch-icon.png`,
      email: `mailto:${env.email}`,
      telephone: env.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kalyan',
        addressCountry: 'IN',
      },
      sameAs: [
        SITE_CONFIG.links.github,
        ...(SITE_CONFIG.links.linkedin ? [SITE_CONFIG.links.linkedin] : []),
        ...(SITE_CONFIG.links.cal ? [SITE_CONFIG.links.cal] : []),
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Diamond Atelier Private Limited',
        jobTitle: 'Full-Stack Developer',
      },
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'Bharat College of Arts and Commerce',
          description: 'Bachelor of Science in Information Technology',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Masai School',
          description: 'Fullstack Web Development',
        },
      ],
      knowsAbout: [
        'JavaScript (ES6+)',
        'TypeScript',
        'React.js',
        'Next.js',
        'React Three Fiber',
        'Three.js',
        'Redux',
        'Tailwind CSS',
        'Node.js',
        'Express.js',
        'REST APIs',
        'JWT',
        'RBAC',
        'Socket.IO',
        'BullMQ',
        'Sharp',
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'Firebase',
        'Typesense',
        'AWS',
        'Cloudflare R2',
        'Docker',
        'CI/CD',
        'Stripe',
        'Razorpay',
        'PostHog',
        'CleverTap',
        'SEO',
        'Vite',
        'Git',
      ],
      knowsLanguage: ['English', 'Hindi'],
      interest: ['Reading', 'Trekking', 'Football', 'Cricket'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: `${SITE_CONFIG.name} — Portfolio`,
      description: SITE_CONFIG.description,
      inLanguage: 'en-US',
      publisher: {
        '@id': `${SITE_CONFIG.url}/#person`,
      },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_CONFIG.url}/#profilepage`,
      url: SITE_CONFIG.url,
      name: `${SITE_CONFIG.name} — ${env.role} Portfolio`,
      mainEntity: {
        '@id': `${SITE_CONFIG.url}/#person`,
      },
      isPartOf: {
        '@id': `${SITE_CONFIG.url}/#website`,
      },
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_CONFIG.url}/#projects`,
      name: 'Featured Work by Prakash Singh',
      description:
        'Production e-commerce and client web applications engineered by Prakash Singh.',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Diamond Forest E-Commerce',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description:
              'Flagship diamond e-commerce platform: live pricing + cold PLP optimization; sheet→R2 media sync; React Three Fiber 3D ring viewer with GLB/metal/gem materials and ring-builder sessions; headless CMS; Stripe + Sharp.',
            url: env.projectLinks.diamondAtelier,
            author: { '@id': `${SITE_CONFIG.url}/#person` },
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Client Web Applications (MERN)',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description:
              'Client web applications on the MERN stack with JWT/RBAC, modular REST APIs, and React/Redux UIs built at Appgenix Infotech LLP.',
            author: { '@id': `${SITE_CONFIG.url}/#person` },
          },
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_CONFIG.url}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is Prakash Singh?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'I am a Full Stack Web Developer based in Kalyan, India with expertise in JavaScript and the MERN stack. I currently work as a Full-Stack Developer at Diamond Atelier Private Limited on diamondforest.com.',
          },
        },
        {
          '@type': 'Question',
          name: 'What technologies do I specialize in?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'I specialize in HTML, CSS, JavaScript, TypeScript, React.js, Redux, Next.js, Node.js, Express.js, RESTful APIs, MongoDB, PostgreSQL, Redis, Docker, and payment gateway integration.',
          },
        },
        {
          '@type': 'Question',
          name: 'What companies have I worked with?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'I am currently a Full-Stack Developer at Diamond Atelier Private Limited building Diamond Forest. Previously I built client web applications on the MERN stack at Appgenix Infotech LLP, and I completed Fullstack Web Development certification at Masai School.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can you contact me?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `You can email me at ${env.email} or explore my GitHub profile at ${env.githubUrl}.`,
          },
        },
      ],
    },
  ],
}
