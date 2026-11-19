import * as React from 'react'
import { env } from '../config/env'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export default function Logo({
  size = 'md',
  showText = true,
  className = '',
}: LogoProps) {
  const sizeMap = {
    sm: { box: 24, font: 'text-lg sm:text-xl' },
    md: { box: 32, font: 'text-xl sm:text-2xl' },
    lg: { box: 44, font: 'text-2xl sm:text-3xl' },
  }
  const dims = size && sizeMap[size] ? sizeMap[size] : sizeMap.md
  const uniqueId = React.useId().replace(/:/g, '')
  const gradientId = `logo-grad-${uniqueId}`

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Geometric PS Monogram Emblem */}
      <svg
        width={dims.box}
        height={dims.box}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="#0a0a0a" />
        <rect
          width="62"
          height="62"
          x="1"
          y="1"
          rx="15"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Letter P */}
        <path d="M18 20 V44" stroke="#f5f5f5" strokeWidth="4.5" strokeLinecap="round" />
        <path
          d="M18 20 H28 C34 20 37 24 37 29 C37 34 34 38 28 38 H18"
          stroke="#f5f5f5"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Letter S in brand gradient */}
        <path
          d="M48 25 C47.5 21 44.5 19.5 41 19.5 C36.5 19.5 34 22.5 34 26 C34 30 37 31.5 41 32.5 C45.5 33.5 48 35.5 48 39.5 C48 43.5 45 44.5 41 44.5 C36.5 44.5 33.5 42 33 38"
          stroke={`url(#${gradientId})`}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {showText && (
        <span
          className={`font-serif tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)] font-normal ${dims.font}`}
        >
          {env.siteName}
        </span>
      )}
    </span>
  )
}
