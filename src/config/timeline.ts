import { env } from './env'

export interface CaseStudyData {
  problem: string
  myRole: string
  stack: string[]
  outcome: string
  learned: string
  screenshotPlaceholder?: string
}

export interface WorkTimelineEntry {
  id: string
  company: string
  role: string
  period: string
  dateRange: {
    start: string
    end: string
  }
  location: string
  workplaceType: 'Onsite' | 'Remote' | 'Hybrid'
  isCurrent?: boolean

  // Project linkage
  projectTitle: string
  projectCategory: 'work'
  projectUrl?: string
  isPrivate: boolean
  privateNotice?: {
    badge: string
    summary: string
  }
  skills: string[]
  projectSummary: string

  // Short Case Study Card data (for internal/restricted platforms)
  caseStudy?: CaseStudyData

  // Action + Technology + Measurable result bullets
  experienceBullets: string[]
  highlight?: boolean
}

export interface PersonalProjectEntry {
  id: string
  title: string
  category: string
  liveUrl?: string
  repoUrl?: string
  isPrivateRepo?: boolean
  isPlaceholder?: boolean
  skills: string[]
  summary: string
  highlights: string[]
}

export interface EducationEntry {
  id: string
  institution: string
  degree: string
  period: string
  note?: string
  coursework: string
}

// ─────────────────────────────────────────────────────────────────────────────
// SINGLE TIMELINE SOURCE OF TRUTH (Dates & Roles can never diverge)
// ─────────────────────────────────────────────────────────────────────────────

export const WORK_TIMELINE: WorkTimelineEntry[] = [
  {
    id: 'diamond-atelier',
    company: 'Diamond Atelier Private Limited',
    role: 'Full-Stack Developer',
    period: 'May 2025 – Present',
    dateRange: { start: 'May 2025', end: 'Present' },
    location: 'Surat',
    workplaceType: 'Hybrid',
    isCurrent: true,
    projectTitle: 'Diamond Forest E-Commerce',
    projectCategory: 'work',
    projectUrl: env.projectLinks.diamondAtelier,
    isPrivate: false,
    skills: [
      'Next.js',
      'React',
      'TypeScript',
      'React Three Fiber',
      'Three.js',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Redis',
      'Cloudflare R2',
      'BullMQ',
      'Stripe',
      'Sharp',
      'Docker',
    ],
    projectSummary:
      'Flagship product Diamond Forest (diamondforest.com). Live pricing + cold PLP optimization; sheet→R2 media sync; in-browser 3D ring viewer (R3F/GLB) with metal/gem materials and ring-builder configurator sessions; Stripe + Sharp/Redis.',
    experienceBullets: [
      'Cut cold PLP builds ~4x (~52s to ~13s; ~1.8s cached) via ~5k published SQL → view membership ~800, in-flight build maps + Redis PLP locks, and membership-catalog reuse on chip filters.',
      'Wired sheet masters through calculateRingPrice: PLP paints minimal default-cell pricing (19.8s → 1.2–1.4s listing path); PDP defers the full matrix to /card-pricing.',
      'Built an in-browser 3D ring studio (React Three Fiber): probe R2 GLBs, deferred WebGL mount, Metal 01/02 + diamond refraction materials, and ring-builder setting→diamond→cart via configurator sessions.',
      'After catalog sheet commits, ran R2 media sync to rewrite product media maps, prune shapes not on the sheet, and invalidate PLP/PDP caches (physical R2 deletes remain intentional replace/admin paths).',
      'Integrated Stripe with HMAC webhook verification, BullMQ failure recovery, and Sharp optimization (82.3% payload reduction) with Redis/L1 listing caches.',
    ],
    highlight: true,
  },
  {
    id: 'appgenix-infotech',
    company: 'Appgenix Infotech LLP',
    role: 'Full-Stack Developer',
    period: 'Dec 2024 – May 2025',
    dateRange: { start: 'Dec 2024', end: 'May 2025' },
    location: 'Surat',
    workplaceType: 'Hybrid',
    projectTitle: 'Client Web Applications (MERN)',
    projectCategory: 'work',
    isPrivate: true,
    skills: [
      'React.js',
      'Redux',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'Git',
    ],
    projectSummary:
      'Built client web applications on the MERN stack, working with designers, QA and developers. Delivered modular REST APIs, JWT/RBAC security, and responsive React UIs with Redux state management.',
    caseStudy: {
      problem:
        'Client products needed reliable MERN backends with secure auth and polished React frontends that stayed in sync with design and QA cycles.',
      myRole:
        'Full-Stack Developer owning RESTful APIs, MongoDB schemas, JWT/RBAC middleware, and React/Redux UI delivery.',
      stack: ['Node.js', 'Express.js', 'MongoDB', 'React.js', 'Redux', 'JWT'],
      outcome:
        'Shipped modular APIs with validation and centralized error handling, secure role-based routes, and responsive reusable UI components integrated with REST APIs.',
      learned:
        'Modular API structure, schema design for reliable storage, and sprint-based delivery with code reviews across design, QA and engineering.',
    },
    experienceBullets: [
      'Built RESTful APIs with Node.js and Express using modular structure, validation and centralized error handling.',
      'Designed MongoDB schemas and optimized queries for faster data retrieval and reliable data storage.',
      'Implemented JWT authentication, role-based authorization and middleware to secure routes.',
      'Built responsive, reusable UI components with React.js and managed application state with Redux.',
      'Integrated the frontend with backend REST APIs, handling loading, error and form-validation states for seamless data flow.',
      'Used Git for version control and took part in code reviews and sprint-based delivery with the team.',
    ],
  },
]

export const PERSONAL_PROJECTS: PersonalProjectEntry[] = []

export const EDUCATION_TIMELINE: EducationEntry[] = [
  {
    id: 'masai-school-edu',
    institution: 'Masai School',
    degree: 'Fullstack Web Development',
    period: 'May 2023 – Feb 2024',
    note: 'Certification — completed the Full-Stack Web Development program; built multiple end-to-end applications using the MERN stack.',
    coursework:
      'Coursework: MERN stack, full-stack web development, end-to-end application building.',
  },
  {
    id: 'bharat-college',
    institution: 'Bharat College of Arts and Commerce',
    degree: 'Bachelor of Science in Information Technology',
    period: 'June 2016 – December 2020',
    coursework:
      'Coursework: Information Technology fundamentals, programming, and systems.',
  },
  {
    id: 'high-school-pcm',
    institution: 'High School',
    degree: 'Science — PCM',
    period: 'Completed',
    coursework: 'Physics, Chemistry, Mathematics foundations.',
  },
]
