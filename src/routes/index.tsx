import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import DitherCanvas from '../components/DitherCanvas'

import { SITE_CONFIG } from '../config/seo'
import { env } from '../config/env'
import {
  WORK_TIMELINE,
  PERSONAL_PROJECTS,
  EDUCATION_TIMELINE,
} from '../config/timeline'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: SITE_CONFIG.title,
      },
      {
        name: 'description',
        content: SITE_CONFIG.description,
      },
      {
        property: 'og:title',
        content: SITE_CONFIG.shortTitle,
      },
      {
        property: 'og:description',
        content: SITE_CONFIG.description,
      },
      {
        property: 'og:url',
        content: `${SITE_CONFIG.url}/`,
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: `${SITE_CONFIG.url}/`,
      },
    ],
  }),
  component: PortfolioPage,
})

const SKILL_TIERS = [
  {
    tier: 'Languages',
    badge: 'Core Languages',
    description:
      'Primary commercial languages for full-stack web and backend platforms.',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'Java', 'C/C++'],
  },
  {
    tier: 'Frontend',
    badge: 'UI & Client Apps',
    description:
      'Component architecture, state management, responsive styling, and rendering modes.',
    skills: [
      'React.js',
      'Next.js (SSR/SSG/ISR)',
      'React Three Fiber',
      'Three.js',
      'Redux',
      'Context API',
      'Tailwind CSS',
      'HTML5',
      'CSS3',
    ],
  },
  {
    tier: 'Backend',
    badge: 'APIs & Services',
    description:
      'RESTful API engineering, authentication tiers, background job queues, and media pipelines.',
    skills: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'JWT auth',
      'RBAC',
      'Socket.IO',
      'BullMQ',
      'Sharp',
    ],
  },
  {
    tier: 'Databases & Cache',
    badge: 'Data Layer',
    description:
      'Relational & document stores, sub-second cache layers, and search indexing.',
    skills: ['PostgreSQL', 'MongoDB', 'Firebase', 'Redis', 'Typesense'],
  },
  {
    tier: 'Cloud & DevOps',
    badge: 'Infra & Delivery',
    description:
      'Containerization, cloud object storage pipelines, and continuous deployment.',
    skills: ['AWS (EC2, S3)', 'Cloudflare R2', 'Docker', 'CI/CD', 'Git/GitHub'],
  },
  {
    tier: 'Product & Commerce',
    badge: 'Payments & Growth',
    description:
      'Payment gateway integrations, customer analytics telemetry, and technical SEO structure.',
    skills: ['Stripe', 'Razorpay', 'PostHog', 'CleverTap', 'SEO'],
  },
  {
    tier: 'Tools & Workflow',
    badge: 'Developer Tooling',
    description:
      'Developer toolchains, API test automation, and terminal environments.',
    skills: ['Vite', 'Postman', 'Linux / Bash', 'npm / pnpm'],
  },
]

const WORK_HABITS = [
  {
    title: 'API Design & Integration',
    badge: 'Full Stack',
    description:
      'Build modular REST APIs with validation and centralized error handling, then wire them into React/Next UIs with clear loading and error states.',
  },
  {
    title: 'Security & Auth',
    badge: 'Security',
    description:
      'Implement JWT authentication, role-based authorization, and middleware so accounts, orders, and payments stay protected.',
  },
  {
    title: 'Performance & Caching',
    badge: 'Reliability',
    description:
      'Use Redis caching with TTL and invalidation for catalog queries, and tune server-side performance for faster API responses.',
  },
  {
    title: 'Collaboration & Delivery',
    badge: 'Teamwork',
    description:
      'Ship in sprints with Git hygiene, code reviews, and close collaboration with designers, QA, and other developers.',
  },
]

const FAQS = [
  {
    q: 'Who is Prakash Singh?',
    a: 'I am a Full Stack Web Developer based in Kalyan, India with expertise in JavaScript and the MERN stack. I currently work as a Full-Stack Developer at Diamond Atelier Private Limited on diamondforest.com.',
  },
  {
    q: 'What is your core technical stack?',
    a: 'Languages: JavaScript (ES6+), TypeScript. Frontend: React.js, Next.js (SSR/SSG/ISR), Redux, Tailwind CSS. Backend: Node.js, Express.js, JWT/RBAC, BullMQ, Sharp. Data: PostgreSQL, MongoDB, Redis. Cloud: AWS, Cloudflare R2, Docker, CI/CD. Commerce: Stripe, Razorpay.',
  },
  {
    q: 'What companies have you worked with?',
    a: 'I am currently a Full-Stack Developer at Diamond Atelier Private Limited building Diamond Forest. Previously I built client web applications on the MERN stack at Appgenix Infotech LLP (Dec 2024 – May 2025). I also completed Fullstack Web Development certification at Masai School (May 2023 – Feb 2024).',
  },
  {
    q: 'What are you looking for next?',
    a: 'I am open to Full Stack Developer and Software Engineer roles where I can keep shipping production MERN/Next.js systems, improve performance, and collaborate closely with product teams.',
  },
  {
    q: 'How can I get in touch?',
    a: `Email me at ${env.email}, call or WhatsApp ${env.phone}, connect on LinkedIn (https://www.linkedin.com/in/prakash-singh14), or review my code on GitHub (${env.githubUrl}).`,
  },
]

function PortfolioPage() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!env.calLink) return
    ;(async function () {
      const cal = await getCalApi({ namespace: env.calNamespace })
      cal('floatingButton', {
        calLink: env.calLink,
        config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
        buttonColor: '#ea580c',
        buttonTextColor: '#ffffff',
      })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(env.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const diamondTimeline = WORK_TIMELINE.find((w) => w.id === 'diamond-atelier')
  const otherWorkTimeline = WORK_TIMELINE.filter((w) => w.id !== 'diamond-atelier')

  return (
    <main className="container-narrow pt-8 sm:pt-14 pb-12 sm:pb-16">
      {/* Hero */}
      <section className="mb-14 sm:mb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
              <Badge variant="accent" size="sm" dot>
                {env.role}
              </Badge>
              <span className="text-xs font-mono text-[var(--text-muted)] whitespace-nowrap">
                @{SITE_CONFIG.handle} &bull; {env.location} &bull; Open for work
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.25rem] font-normal tracking-tight text-[var(--text-primary)] mb-5 leading-[1.08] sm:leading-[1.06]">
              {env.siteName} <br />
              <span className="italic text-[var(--accent)] font-serif text-3xl sm:text-5xl lg:text-[3.5rem] block mt-1">
                Full Stack Developer.
              </span>
            </h1>

            <div className="mb-6 max-w-xl space-y-2.5">
              <p className="text-base sm:text-lg text-[var(--text-primary)] font-sans leading-relaxed">
                Dynamic Full Stack Web Developer with expertise in JavaScript and the MERN stack, adept at quickly learning and implementing new technologies like Generative AI.
              </p>
              <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                Skilled in seamless frontend and backend integration and optimising database systems. Strong problem-solving and collaborative team skills drive project success.
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 flex-nowrap overflow-x-auto py-1">
              <Button
                as="a"
                href={env.resumeUrl}
                download="Prakash_Singh_Resume.pdf"
                variant="primary"
                size="md"
                className="whitespace-nowrap shrink-0"
                title="Download Resume (PDF)"
              >
                <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
                  <path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14H2.75z" />
                  <path d="M7.25 1.75v7.69L4.97 7.16a.75.75 0 1 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 9.44V1.75a.75.75 0 0 0-1.5 0z" />
                </svg>
                <span>Download Resume (PDF)</span>
              </Button>

              {env.calLink ? (
                <Button
                  type="button"
                  data-cal-link={env.calLink}
                  data-cal-namespace={env.calNamespace}
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                  onClick={async () => {
                    const cal = await getCalApi({ namespace: env.calNamespace })
                    cal('modal', {
                      calLink: env.calLink,
                      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
                    })
                  }}
                  variant="secondary"
                  size="md"
                  className="cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Book a 30m Call</span>
                </Button>
              ) : (
                <Button
                  as="a"
                  href={`mailto:${env.email}`}
                  variant="secondary"
                  size="md"
                  className="whitespace-nowrap shrink-0"
                >
                  <span>Email Me</span>
                </Button>
              )}

              <Button
                type="button"
                onClick={copyEmail}
                variant="secondary"
                size="md"
                className="whitespace-nowrap shrink-0"
              >
                {copied ? (
                  <span className="text-[var(--accent)] font-medium">Copied!</span>
                ) : (
                  <span>Copy Email</span>
                )}
              </Button>

              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                title="GitHub"
                className="inline-flex items-center justify-center w-10 h-10 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors shrink-0"
              >
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>

              {SITE_CONFIG.links.linkedin ? (
                <a
                  href={SITE_CONFIG.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors shrink-0"
                >
                  <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                </a>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-[var(--text-secondary)] mt-3.5 mb-4">
              <span className="font-medium text-[var(--text-primary)]">Cold PLP ~5k → ~800 (~4x)</span>
              <span className="text-[var(--text-muted)]">&bull;</span>
              <span className="font-medium text-[var(--text-primary)]">3D RingViewer (R3F)</span>
              <span className="text-[var(--text-muted)]">&bull;</span>
              <span className="font-medium text-[var(--text-primary)]">Sheet → R2 media sync</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex items-center justify-center pt-6 lg:pt-0" aria-hidden="true">
            <DitherCanvas />
          </div>
        </div>
      </section>

      {/* Technical Skills — 2nd section, above experience */}
      <section id="stack" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            Technical Skills
          </h2>
          <span className="text-xs font-mono text-[var(--accent-text)]">
            Languages &bull; Frontend &bull; Backend &bull; Cloud
          </span>
        </div>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {SKILL_TIERS.map((tierGroup) => (
            <div key={tierGroup.tier} className="py-5 sm:py-6 grid sm:grid-cols-12 gap-3 sm:gap-6 items-start">
              <div className="sm:col-span-3">
                <span className="text-xs font-mono text-[var(--accent-text)] tracking-wider uppercase">
                  {tierGroup.tier}
                </span>
                <span className="block font-serif text-lg text-[var(--text-primary)] mt-0.5">
                  {tierGroup.badge}
                </span>
              </div>
              <div className="sm:col-span-5 flex flex-wrap gap-1.5">
                {tierGroup.skills.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="sm:col-span-4 text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
                {tierGroup.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case study: Diamond Atelier */}
      <section id="case-study" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)]"></span>
            <h2 className="text-xs uppercase tracking-widest font-mono font-semibold text-[var(--text-primary)]">
              Diamond Atelier: Case Study
            </h2>
          </div>
          <span className="text-xs font-mono text-[var(--accent-text)]">
            Performance &amp; Architecture
          </span>
        </div>

        <div className="p-6 sm:p-8 rounded-[12px] border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[var(--border-subtle)]">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-text)]">
                Production E-Commerce &bull; diamondforest.com &bull;{' '}
                {diamondTimeline?.period || 'May 2025 – Present'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] mt-1">
                Cold PLP, Live Pricing, R2 Media Sync &amp; 3D Ring Viewer
              </h3>
            </div>
            {diamondTimeline?.projectUrl && (
              <a
                href={diamondTimeline.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--accent-text)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors no-underline cursor-pointer"
              >
                <span>Live Site</span>
                <svg viewBox="0 0 16 16" width="11" height="11" fill="currentColor">
                  <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6 py-6 border-b border-[var(--border-subtle)]">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                01 / The Problem
              </h4>
              <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                Cold PLP builds priced far more of the catalog than a listing needs, and chip filters often re-ran full LEARN paths. Product photography lived in R2 while sheets only updated catalog metadata — without sync, stale media maps and caches kept wrong images on the storefront. Content/graphics changes also waited on developers.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                02 / My Role
              </h4>
              <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                Owned cold-PLP and pricing-path fixes, R2 media map sync after sheet commits, headless CMS for a 6-person content team, and Stripe HMAC webhooks with BullMQ recovery plus Sharp/Redis media optimization.
              </p>
            </div>
          </div>

          <div className="py-6 border-b border-[var(--border-subtle)]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-4">
              03 / Key Decisions
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xs font-mono text-[var(--accent-text)] block mb-1 font-semibold">
                  Price engine (PLP vs PDP)
                </span>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  Sheet masters → <span className="font-mono text-[var(--text-primary)]">calculateRingPrice</span> → quote context. PLP uses minimal default-cell pricing; PDP defers the full matrix to <span className="font-mono text-[var(--text-primary)]">/card-pricing</span> (19.8s → 1.2–1.4s on the listing path).
                </p>
              </div>
              <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xs font-mono text-[var(--accent-text)] block mb-1 font-semibold">
                  Cold PLP path
                </span>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  ~5k published rows via SQL → view membership ~800 → in-flight build maps + Redis PLP locks → membership-catalog reuse on chip filters so cold LEARN is not repeated.
                </p>
              </div>
              <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xs font-mono text-[var(--accent-text)] block mb-1 font-semibold">
                  Media after sheet upload
                </span>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  Sheet updates catalog metadata; R2 stays photo source of truth. Sync rewrites media maps, prunes shapes not on the sheet, then invalidates PLP/PDP caches. Physical R2 deletes are intentional (replace/admin) — not automatic on every import.
                </p>
              </div>
              <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xs font-mono text-[var(--accent-text)] block mb-1 font-semibold">
                  Headless CMS
                </span>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  Content and graphics team publishes site media and catalog copy independently — developer image-change tickets fell from ~15/week to 0.
                </p>
              </div>
              <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xs font-mono text-[var(--accent-text)] block mb-1 font-semibold">
                  3D Ring Viewer
                </span>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  R2 GLBs probed for reachable CDN paths, then deferred React Three Fiber mount. Mesh names drive metal (`Metal 01`/`02`) and gem refraction; ring-builder sessions pair setting + diamond into cart.
                </p>
              </div>
              <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xs font-mono text-[var(--accent-text)] block mb-1 font-semibold">
                  Stripe · Sharp · Redis
                </span>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  Stripe HMAC webhook verification, BullMQ failure recovery, and Sharp image optimization (82.3% payload reduction) with listing/pricing payloads cached in Redis + L1.
                </p>
              </div>
            </div>
          </div>

          <div className="py-6 border-b border-[var(--border-subtle)]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-4">
              04 / System Architecture
            </h4>
            <div className="w-full overflow-x-auto p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
              <svg
                viewBox="0 0 920 220"
                className="w-full min-w-[780px] h-auto text-[var(--text-primary)]"
                fill="none"
                role="img"
                aria-label="Diamond Forest pricing, PLP, and media architecture"
              >
                <rect x="16" y="78" width="120" height="56" rx="8" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="76" y="102" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="monospace" fontWeight="bold">Browser</text>
                <text x="76" y="118" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="10" fontFamily="monospace">Shopper UI</text>

                <path d="M136 106 L178 106" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="157" y="98" textAnchor="middle" fill="#ea580c" fontSize="9" fontFamily="monospace">HTTPS</text>

                <rect x="178" y="70" width="150" height="72" rx="8" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="253" y="98" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="monospace" fontWeight="bold">Next.js Storefront</text>
                <text x="253" y="116" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="10" fontFamily="monospace">PLP preview · revalidate</text>

                <path d="M328 106 L372 106" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="350" y="98" textAnchor="middle" fill="#ea580c" fontSize="9" fontFamily="monospace">REST</text>

                <rect x="372" y="52" width="176" height="108" rx="8" stroke="#ea580c" strokeWidth="1.5" fill="#ea580c" fillOpacity="0.08" />
                <text x="460" y="78" textAnchor="middle" fill="#ea580c" fontSize="12" fontFamily="monospace" fontWeight="bold">Node.js / Medusa</text>
                <text x="460" y="96" textAnchor="middle" fill="currentColor" fillOpacity="0.85" fontSize="10" fontFamily="monospace">calculateRingPrice</text>
                <text x="460" y="112" textAnchor="middle" fill="currentColor" fillOpacity="0.75" fontSize="10" fontFamily="monospace">PLP minimal · /card-pricing</text>
                <text x="460" y="128" textAnchor="middle" fill="currentColor" fillOpacity="0.65" fontSize="9" fontFamily="monospace">In-flight + Redis PLP locks</text>
                <text x="460" y="144" textAnchor="middle" fill="currentColor" fillOpacity="0.55" fontSize="9" fontFamily="monospace">CMS · RBAC · R2 sync</text>

                <path d="M548 78 L610 28" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
                <path d="M548 96 L610 68" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
                <path d="M548 114 L610 108" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
                <path d="M548 132 L610 148" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
                <path d="M548 148 L610 188" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />

                <rect x="610" y="8" width="290" height="36" rx="6" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="755" y="24" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="monospace" fontWeight="bold">PostgreSQL</text>
                <text x="755" y="38" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace">~5k published → view ~800</text>

                <rect x="610" y="50" width="290" height="36" rx="6" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="755" y="66" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="monospace" fontWeight="bold">Redis + L1</text>
                <text x="755" y="80" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="9" fontFamily="monospace">PLP/PDP · pricing · build locks</text>

                <rect x="610" y="92" width="290" height="36" rx="6" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="755" y="108" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="monospace" fontWeight="bold">Cloudflare R2</text>
                <text x="755" y="122" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="9" fontFamily="monospace">Photos SoT · media maps sync</text>

                <rect x="610" y="134" width="290" height="36" rx="6" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="755" y="150" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="monospace" fontWeight="bold">Sharp Pipeline</text>
                <text x="755" y="164" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="9" fontFamily="monospace">WebP tiers · 82.3% smaller</text>

                <rect x="610" y="176" width="290" height="36" rx="6" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="755" y="192" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="monospace" fontWeight="bold">BullMQ &amp; Stripe</text>
                <text x="755" y="206" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="9" fontFamily="monospace">HMAC webhooks · recovery</text>
              </svg>
            </div>
            <p className="text-[11px] font-mono text-[var(--text-muted)] mt-3 leading-relaxed">
              Sheet → catalog metadata → optional R2 media sync (map rewrite + prune) → Redis/ISR invalidate. Physical object delete is a separate replace/admin path.
            </p>
          </div>

          <div className="py-6 border-b border-[var(--border-subtle)]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-4">
              05 / 3D Ring Viewer Architecture
            </h4>
            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xs font-mono text-[var(--accent-text)] block mb-1 font-semibold">
                  Asset resolve
                </span>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  GLBs live on R2 (`Products/Rings/LR…/… GLB.glb`). Naming variants are probed via <span className="font-mono text-[var(--text-primary)]">resolveReachableGlbUrl</span> so the first reachable CDN path wins before WebGL mounts.
                </p>
              </div>
              <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xs font-mono text-[var(--accent-text)] block mb-1 font-semibold">
                  Deferred WebGL
                </span>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  PDP gallery paints poster/media first; <span className="font-mono text-[var(--text-primary)]">ViewerSlot</span> dynamic-imports <span className="font-mono text-[var(--text-primary)]">RingViewer</span> only after GLB probe OK — keeps first paint off the GPU path.
                </p>
              </div>
              <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xs font-mono text-[var(--accent-text)] block mb-1 font-semibold">
                  Materials runtime
                </span>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  <span className="font-mono text-[var(--text-primary)]">NativeViewer</span> loads GLTF, applies metal materials (`Metal 01` / two-tone `Metal 02`), HDR env maps, and diamond refraction / colour-stone presets from mesh names — metal chips retint without full reload when the GLB URL is unchanged.
                </p>
              </div>
              <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xs font-mono text-[var(--accent-text)] block mb-1 font-semibold">
                  Ring builder commerce
                </span>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  Wizard flow setting → diamond → complete ring via configurator sessions; complete/setting PDP reuses the same 3D viewer while cart lines carry setting + center stone.
                </p>
              </div>
            </div>
            <div className="w-full overflow-x-auto p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
              <svg
                viewBox="0 0 920 170"
                className="w-full min-w-[780px] h-auto text-[var(--text-primary)]"
                fill="none"
                role="img"
                aria-label="Diamond Forest 3D ring viewer architecture"
              >
                <rect x="16" y="50" width="130" height="70" rx="8" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="81" y="78" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="monospace" fontWeight="bold">R2 / CDN</text>
                <text x="81" y="96" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="10" fontFamily="monospace">GLB · HDR · dmat</text>

                <path d="M146 85 L188 85" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="167" y="76" textAnchor="middle" fill="#ea580c" fontSize="9" fontFamily="monospace">probe</text>

                <rect x="188" y="42" width="150" height="86" rx="8" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="263" y="72" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="monospace" fontWeight="bold">PDP Gallery</text>
                <text x="263" y="90" textAnchor="middle" fill="currentColor" fillOpacity="0.7" fontSize="10" fontFamily="monospace">derive + HEAD probe</text>
                <text x="263" y="108" textAnchor="middle" fill="currentColor" fillOpacity="0.55" fontSize="9" fontFamily="monospace">ViewerSlot idle mount</text>

                <path d="M338 85 L380 85" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="359" y="76" textAnchor="middle" fill="#ea580c" fontSize="9" fontFamily="monospace">WebGL</text>

                <rect x="380" y="34" width="176" height="102" rx="8" stroke="#ea580c" strokeWidth="1.5" fill="#ea580c" fillOpacity="0.08" />
                <text x="468" y="62" textAnchor="middle" fill="#ea580c" fontSize="12" fontFamily="monospace" fontWeight="bold">RingViewer</text>
                <text x="468" y="80" textAnchor="middle" fill="currentColor" fillOpacity="0.85" fontSize="10" fontFamily="monospace">R3F Canvas · Orbit</text>
                <text x="468" y="98" textAnchor="middle" fill="currentColor" fillOpacity="0.75" fontSize="10" fontFamily="monospace">NativeViewer · useGLTF</text>
                <text x="468" y="116" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="9" fontFamily="monospace">Metal · Gem refraction</text>

                <path d="M556 70 L612 48" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
                <path d="M556 85 L612 85" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
                <path d="M556 100 L612 122" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />

                <rect x="612" y="20" width="288" height="40" rx="6" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="756" y="38" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="monospace" fontWeight="bold">Metal 01 / Metal 02</text>
                <text x="756" y="52" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="9" fontFamily="monospace">Two-tone shank retint</text>

                <rect x="612" y="68" width="288" height="40" rx="6" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="756" y="86" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="monospace" fontWeight="bold">Diamond / Colour stone</text>
                <text x="756" y="100" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="9" fontFamily="monospace">HDR · MeshRefraction</text>

                <rect x="612" y="116" width="288" height="40" rx="6" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.04" />
                <text x="756" y="134" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="monospace" fontWeight="bold">Configurator + Cart</text>
                <text x="756" y="148" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="9" fontFamily="monospace">Setting + center diamond</text>
              </svg>
            </div>
          </div>

          <div className="pt-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3">
              06 / Measurable Results
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xl sm:text-2xl font-serif text-[var(--accent)] block">~52s → ~13s</span>
                <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">Cold PLP (~4x)</span>
                <span className="text-[11px] font-sans text-[var(--text-secondary)] mt-1 block">~5k → ~800 membership + locks; cached ~1.8s.</span>
              </div>
              <div className="p-3.5 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xl sm:text-2xl font-serif text-[var(--text-primary)] block">19.8s → 1.2–1.4s</span>
                <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">Listing Pricing</span>
                <span className="text-[11px] font-sans text-[var(--text-secondary)] mt-1 block">Minimal default cell; full matrix deferred to PDP.</span>
              </div>
              <div className="p-3.5 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xl sm:text-2xl font-serif text-[var(--text-primary)] block">82.3%</span>
                <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">Sharp Payload Cut</span>
                <span className="text-[11px] font-sans text-[var(--text-secondary)] mt-1 block">WebP tiers; listing payloads cached in Redis.</span>
              </div>
              <div className="p-3.5 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                <span className="text-xl sm:text-2xl font-serif text-[var(--text-primary)] block">~15/wk → 0</span>
                <span className="text-xs font-mono text-[var(--text-muted)] block mt-0.5">Dev Content Tickets</span>
                <span className="text-[11px] font-sans text-[var(--text-secondary)] mt-1 block">Headless CMS for a 6-person content team.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section id="projects" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-8">
          <div>
            <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
              Featured Projects
            </h2>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Full-Stack Commerce &bull; Client Apps
          </span>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)]"></span>
              <h3 className="text-xs font-mono uppercase tracking-widest font-semibold text-[var(--text-primary)]">
                01 / Work Experience &amp; Production Systems
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              Diamond Atelier &bull; Appgenix Infotech
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-sans mb-6 max-w-2xl">
            Commerce backends and client web applications engineered during full-time employment.
          </p>

          {diamondTimeline && (
            <div className="mb-6 p-6 sm:p-8 rounded-[10px] border border-[var(--border-strong)] bg-[var(--bg-surface)]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-[var(--accent-text)] uppercase tracking-wider">
                    {diamondTimeline.company}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">&bull;</span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">{diamondTimeline.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  {diamondTimeline.projectUrl && (
                    <a
                      href={diamondTimeline.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--accent-text)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors no-underline cursor-pointer"
                      title="Open Live Link"
                    >
                      <span>Live Link</span>
                      <svg viewBox="0 0 16 16" width="11" height="11" fill="currentColor">
                        <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  <span className="text-xs font-mono px-2 py-0.5 rounded-[4px] bg-[var(--bg-canvas)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                    {diamondTimeline.role}
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <a
                  href={diamondTimeline.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 text-inherit no-underline"
                >
                  <h4 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                    {diamondTimeline.projectTitle}
                  </h4>
                  <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" className="text-[var(--text-muted)] transition-transform duration-200 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
                    <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed max-w-3xl mb-6">
                {diamondTimeline.projectSummary}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {diamondTimeline.skills.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-[4px] text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            {otherWorkTimeline.map((work) => (
              <div
                key={work.id}
                className="p-5 sm:p-6 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col hover:border-[var(--border-strong)] transition-colors"
              >
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--text-muted)]">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded-[3px] text-[10px] font-mono uppercase border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]">
                        {work.company}
                      </span>
                      <span>&bull; {work.period}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      Case Study
                    </span>
                  </div>

                  <div className="mb-3">
                    <h4 className="font-serif text-2xl text-[var(--text-primary)]">
                      {work.projectTitle}
                    </h4>
                  </div>

                  {work.caseStudy ? (
                    <div className="space-y-2.5 text-xs font-sans">
                      <div className="p-3 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                        <span className="font-mono text-[var(--accent-text)] block font-semibold mb-1">
                          Problem
                        </span>
                        <p className="text-[var(--text-secondary)] leading-relaxed m-0 text-xs">
                          {work.caseStudy.problem}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="p-3 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                          <span className="font-mono text-[var(--text-primary)] block font-semibold mb-1">
                            My Role
                          </span>
                          <p className="text-[var(--text-secondary)] leading-relaxed m-0 text-[11px]">
                            {work.caseStudy.myRole}
                          </p>
                        </div>
                        <div className="p-3 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                          <span className="font-mono text-[var(--text-primary)] block font-semibold mb-1">
                            Outcome
                          </span>
                          <p className="text-[var(--text-secondary)] leading-relaxed m-0 text-[11px]">
                            {work.caseStudy.outcome}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
                        <span className="font-mono text-[var(--accent-text)] block font-semibold mb-1">
                          What I Learned
                        </span>
                        <p className="text-[var(--text-secondary)] leading-relaxed m-0 text-xs">
                          {work.caseStudy.learned}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                      {work.projectSummary}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3.5 border-t border-[var(--border-subtle)] flex flex-wrap gap-1.5">
                  {work.skills.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-[4px] text-[11px] font-mono border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {PERSONAL_PROJECTS.length > 0 && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pt-8 border-t border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                <h3 className="text-xs font-mono uppercase tracking-widest font-semibold text-[var(--text-primary)]">
                  02 / Personal Projects
                </h3>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {PERSONAL_PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 sm:p-6 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col"
                >
                  <h4 className="font-serif text-2xl text-[var(--text-primary)] mb-2">{proj.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                    {proj.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Experience */}
      <section id="experience" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            Work Experience
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Career Timeline
          </span>
        </div>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {WORK_TIMELINE.map((exp) => (
            <div key={exp.id} className="py-6 sm:py-7 grid sm:grid-cols-12 gap-3 sm:gap-6 items-baseline">
              <div className="sm:col-span-3 text-xs font-mono text-[var(--text-muted)]">
                {exp.period}
              </div>
              <div className="sm:col-span-4">
                <span className="font-serif text-xl text-[var(--text-primary)]">{exp.company}</span>
                <span className="block text-xs font-mono text-[var(--accent-text)] mt-0.5">
                  {exp.role} &bull; {exp.location} ({exp.workplaceType})
                </span>
              </div>
              <div className="sm:col-span-5 text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                <ul className="space-y-2 list-none p-0 m-0">
                  {exp.experienceBullets.map((bullet, idx) => (
                    <li key={idx} className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-[var(--accent)]">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            Education
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Academic &amp; Certifications
          </span>
        </div>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {EDUCATION_TIMELINE.map((edu) => (
            <div key={edu.id} className="py-4 sm:py-5 grid sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
              <div className="sm:col-span-3 text-xs font-mono text-[var(--text-muted)]">
                {edu.period}
              </div>
              <div className="sm:col-span-4">
                <span className="font-serif text-lg text-[var(--text-primary)]">{edu.institution}</span>
                <span className="block text-xs font-mono text-[var(--text-muted)]">
                  {edu.degree}
                  {edu.note && (
                    <span className="block text-[var(--accent-text)] text-[11px] font-mono mt-0.5">
                      {edu.note}
                    </span>
                  )}
                </span>
              </div>
              <div className="sm:col-span-5 text-sm text-[var(--text-muted)] font-sans">
                {edu.coursework}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How I work */}
      <section id="how-i-work" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            How I Work &bull; Engineering Discipline
          </h2>
          <span className="text-xs font-mono text-[var(--accent-text)]">
            APIs &bull; Security &bull; Performance
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {WORK_HABITS.map((habit) => (
            <div
              key={habit.title}
              className="p-5 sm:p-6 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-lg text-[var(--text-primary)]">
                  {habit.title}
                </h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-[3px] border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-muted)]">
                  {habit.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                {habit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-14 sm:mb-20 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            FAQ &bull; About {env.siteName}
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            First-Person Answers
          </span>
        </div>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group py-4 cursor-pointer [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between font-serif text-base sm:text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors list-none select-none">
                <span>{item.q}</span>
                <span className="text-xs font-mono text-[var(--text-muted)] group-open:rotate-45 transition-transform duration-200">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] pb-2.5 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            Contact &amp; Logistics
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {env.email}
          </span>
        </div>

        <div className="mb-8 p-5 sm:p-6 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 className="text-xs font-mono uppercase tracking-widest font-semibold text-[var(--text-primary)]">
              Hiring Logistics &amp; Availability
            </h4>
          </div>
          <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4 text-xs font-mono">
            <div>
              <span className="text-[var(--text-muted)] block mb-0.5">Location &amp; Timezone:</span>
              <span className="text-[var(--text-primary)]">{env.locationDetail}</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)] block mb-0.5">Phone:</span>
              <span className="text-[var(--text-primary)]">{env.phone}</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)] block mb-0.5">Work Mode:</span>
              <span className="text-[var(--text-primary)]">Open to Onsite, Hybrid &amp; Remote</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)] block mb-0.5">Interests:</span>
              <span className="text-[var(--text-primary)]">Reading · Trekking · Football · Cricket</span>
            </div>
          </div>
        </div>

        <div className="max-w-xl">
          <h3 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] mb-2.5">
            Let&apos;s build together.
          </h3>
          <p className="text-base text-[var(--text-secondary)] font-sans leading-relaxed mb-6">
            Open to full-time Full Stack Developer roles. Whether you have an open requisition or a product to ship, my inbox is open.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Button as="a" href={`mailto:${env.email}`} variant="primary" size="md">
              Email Me
            </Button>

            <a
              href={env.resumeUrl}
              download="Prakash_Singh_Resume.pdf"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[6px] text-xs font-mono font-medium border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors no-underline shadow-sm"
              title="Download Resume PDF"
            >
              <span>Download Resume (PDF)</span>
            </a>

            <Button type="button" onClick={copyEmail} variant="secondary" size="md">
              {copied ? (
                <span className="text-[var(--accent)] font-medium">Copied!</span>
              ) : (
                <span>Copy Email</span>
              )}
            </Button>
          </div>

          <p className="text-xs font-mono text-[var(--text-muted)] mt-4">
            Direct email:{' '}
            <a
              href={`mailto:${env.email}`}
              className="text-[var(--accent-text)] underline hover:text-[var(--accent)] transition-colors"
            >
              {env.email}
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
