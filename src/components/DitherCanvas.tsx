import { useEffect, useRef } from 'react'
import {
  FIELD_RIPPLE_EVENT,
  FIELD_SKILL_EVENT,
  type FieldSkillTier,
} from '../lib/fieldEvents'

type Ripple = { x: number; y: number; born: number; life: number }

function skillHotspot(
  tier: FieldSkillTier,
  px: number,
  py: number,
  w: number,
  h: number,
  t: number,
) {
  if (!tier || w <= 0 || h <= 0) return 0
  const nx = px / w
  const ny = py / h
  const pulse = 0.85 + 0.15 * Math.sin(t * 3.2)

  switch (tier) {
    case 'Languages':
      return Math.max(0, 1 - Math.abs(nx - 0.32) * 3.2 - Math.abs(ny - 0.5) * 1.4) * pulse
    case 'Frontend':
      return Math.max(0, 1 - Math.abs(ny - 0.28) * 3.4 - Math.abs(nx - 0.5) * 1.1) * pulse
    case 'Backend':
      return Math.max(0, 1 - Math.abs(nx - 0.72) * 3.1 - Math.abs(ny - 0.62) * 1.5) * pulse
    case 'Databases & Cache': {
      const cell = Math.sin(nx * 18) * Math.cos(ny * 18)
      return Math.max(0, cell) * 0.95 * pulse
    }
    case 'Cloud & DevOps': {
      const cx = nx - 0.5
      const cy = ny - 0.42
      const ring = Math.abs(Math.sqrt(cx * cx + cy * cy) - 0.28)
      return Math.max(0, 1 - ring * 7) * pulse
    }
    case 'Product & Commerce': {
      const d = Math.hypot(nx - 0.5, ny - 0.5)
      return Math.max(0, 1 - d * 2.6) * pulse
    }
    case 'Tools & Workflow': {
      const diag = Math.abs(nx - ny)
      return Math.max(0, 1 - diag * 4.5) * 0.9 * pulse
    }
    default:
      return 0
  }
}

export default function DitherCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    vx: 0,
    vy: 0,
    active: false,
  })
  const ripplesRef = useRef<Ripple[]>([])
  const scrollGainRef = useRef(1)
  const skillTierRef = useRef<FieldSkillTier>(null)
  const skillGainRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId = 0
    let width = 0
    let height = 0
    let dpr = 1
    let maskCanvas: HTMLCanvasElement | null = null
    let maskData: Uint8ClampedArray | null = null
    let maskW = 0
    let maskH = 0
    let hudLabel = 'PS · field'

    const p = new Uint8Array(512)
    const permutation = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30,
      69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94,
      252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136,
      171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229,
      122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25,
      63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116,
      188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202,
      38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28,
      42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167,
      43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104,
      218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51,
      145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176,
      115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243,
      141, 128, 195, 78, 66, 215, 61, 156, 180,
    ]
    for (let i = 0; i < 256; i++) p[256 + i] = p[i] = permutation[i]

    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
    const lerp = (t: number, a: number, b: number) => a + t * (b - a)
    const grad = (hash: number, x: number, y: number, z: number) => {
      const h = hash & 15
      const u = h < 8 ? x : y
      const v = h < 4 ? y : h === 12 || h === 14 ? x : z
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
    }

    const noise3D = (x: number, y: number, z: number) => {
      const X = Math.floor(x) & 255
      const Y = Math.floor(y) & 255
      const Z = Math.floor(z) & 255
      x -= Math.floor(x)
      y -= Math.floor(y)
      z -= Math.floor(z)
      const u = fade(x)
      const v = fade(y)
      const w = fade(z)
      const A = p[X] + Y
      const AA = p[A] + Z
      const AB = p[A + 1] + Z
      const B = p[X + 1] + Y
      const BA = p[B] + Z
      const BB = p[B + 1] + Z
      return lerp(
        w,
        lerp(
          v,
          lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
          lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z)),
        ),
        lerp(
          v,
          lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)),
          lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1)),
        ),
      )
    }

    const fbm = (x: number, y: number, z: number) => {
      let total = 0
      let amplitude = 1
      let frequency = 1
      for (let i = 0; i < 4; i++) {
        total += noise3D(x * frequency, y * frequency, z * frequency) * amplitude
        amplitude *= 0.52
        frequency *= 1.95
      }
      return total
    }

    const buildMask = () => {
      maskW = Math.max(1, Math.floor(width))
      maskH = Math.max(1, Math.floor(height))
      maskCanvas = document.createElement('canvas')
      maskCanvas.width = maskW
      maskCanvas.height = maskH
      const mctx = maskCanvas.getContext('2d')
      if (!mctx) return
      mctx.clearRect(0, 0, maskW, maskH)
      mctx.textAlign = 'center'
      mctx.textBaseline = 'middle'
      const fontSize = Math.min(maskW, maskH) * 0.46
      mctx.font = `600 ${fontSize}px "Instrument Serif", Georgia, serif`
      // Soft halo then solid core → PS reads clearly in the dot field
      mctx.fillStyle = 'rgba(255,255,255,0.35)'
      mctx.fillText('PS', maskW / 2 + 1.5, maskH / 2 + fontSize * 0.05 + 1.5)
      mctx.fillStyle = '#fff'
      mctx.fillText('PS', maskW / 2, maskH / 2 + fontSize * 0.05)
      maskData = mctx.getImageData(0, 0, maskW, maskH).data
    }

    const readAccent = () => {
      const styles = getComputedStyle(document.documentElement)
      const accent = styles.getPropertyValue('--accent').trim() || '#ff5500'
      const parse = (hex: string) => {
        const h = hex.replace('#', '')
        if (h.length !== 6) return { r: 255, g: 85, b: 0 }
        return {
          r: parseInt(h.slice(0, 2), 16),
          g: parseInt(h.slice(2, 4), 16),
          b: parseInt(h.slice(4, 6), 16),
        }
      }
      return parse(accent)
    }

    const sampleMask = (px: number, py: number) => {
      if (!maskData || maskW === 0) return 0
      const x = Math.min(maskW - 1, Math.max(0, Math.floor(px)))
      const y = Math.min(maskH - 1, Math.max(0, Math.floor(py)))
      return maskData[(y * maskW + x) * 4] / 255
    }

    const handleResize = () => {
      const rect = container.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildMask()
    }

    handleResize()
    const ro = new ResizeObserver(handleResize)
    ro.observe(container)

    let time = 0
    const dotSpacing = 5.6
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let accentRGB = readAccent()

    const themeObserver = new MutationObserver(() => {
      accentRGB = readAccent()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })

    const updateScrollGain = () => {
      const rect = container.getBoundingClientRect()
      const viewH = window.innerHeight || 1
      // Full power near top of viewport; softens as hero scrolls away
      const visible = Math.min(1, Math.max(0, (rect.bottom - viewH * 0.08) / (rect.height + viewH * 0.35)))
      const focus = Math.min(1, Math.max(0, 1 - Math.abs(rect.top + rect.height * 0.35) / (viewH * 0.9)))
      scrollGainRef.current = 0.55 + visible * 0.25 + focus * 0.35
    }

    const onScroll = () => updateScrollGain()
    updateScrollGain()
    window.addEventListener('scroll', onScroll, { passive: true })

    const onSkill = (event: Event) => {
      const tier = (event as CustomEvent<{ tier: FieldSkillTier }>).detail?.tier ?? null
      skillTierRef.current = tier
      hudLabel = tier ? `skill · ${tier.split(' ')[0].toLowerCase()}` : 'PS · field'
    }

    const pushRipple = (x: number, y: number, life = 1400) => {
      ripplesRef.current.push({ x, y, born: performance.now(), life })
      if (ripplesRef.current.length > 6) ripplesRef.current.shift()
    }

    const onExternalRipple = () => {
      pushRipple(width * 0.5, height * 0.5, 1600)
      // Secondary delayed ring for case-study entrance
      window.setTimeout(() => {
        pushRipple(width * 0.38, height * 0.42, 1200)
      }, 180)
    }

    window.addEventListener(FIELD_SKILL_EVENT, onSkill)
    window.addEventListener(FIELD_RIPPLE_EVENT, onExternalRipple)

    const render = () => {
      time += reduceMotion ? 0.002 : 0.0065

      skillGainRef.current +=
        ((skillTierRef.current ? 1 : 0) - skillGainRef.current) * 0.08

      const prevX = mouseRef.current.x
      const prevY = mouseRef.current.y
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1
      mouseRef.current.vx = mouseRef.current.x - prevX
      mouseRef.current.vy = mouseRef.current.y - prevY

      const isDark =
        document.documentElement.classList.contains('dark') ||
        document.documentElement.getAttribute('data-theme') === 'dark'

      ctx.fillStyle = isDark ? '#080808' : '#fafaf9'
      ctx.fillRect(0, 0, width, height)

      const now = performance.now()
      ripplesRef.current = ripplesRef.current.filter((r) => now - r.born < r.life)

      const cols = Math.ceil(width / dotSpacing)
      const rows = Math.ceil(height / dotSpacing)
      const maxRadius = dotSpacing * 0.48
      const breath = 0.5 + 0.5 * Math.sin(time * 1.25)
      const idleBoost = mouseRef.current.active ? 0.18 : 0.92 + breath * 0.12
      const scrollGain = scrollGainRef.current
      const skillGain = skillGainRef.current
      const { r: ar, g: ag, b: ab } = accentRGB
      const cx = width * 0.5
      const cy = height * 0.48
      const orbitR = Math.min(width, height) * 0.34

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const px = i * dotSpacing + dotSpacing / 2
          const py = j * dotSpacing + dotSpacing / 2

          const dx = px - mouseRef.current.x
          const dy = py - mouseRef.current.y
          const mouseDist = Math.sqrt(dx * dx + dy * dy)
          const mouseField = mouseRef.current.active
            ? Math.max(0, 1 - mouseDist / 150)
            : 0

          let nx = px * 0.0052
          let ny = py * 0.0052

          if (mouseField > 0) {
            const angle = Math.atan2(dy, dx)
            const swirl = mouseField * 0.85
            nx += Math.cos(angle + Math.PI / 2) * swirl * 0.09
            ny += Math.sin(angle + Math.PI / 2) * swirl * 0.09
            nx += mouseRef.current.vx * 0.002 * mouseField
            ny += mouseRef.current.vy * 0.002 * mouseField
          }

          const qx = fbm(nx, ny, time * 0.2)
          const qy = fbm(nx + 5.2, ny + 1.3, time * 0.2)
          const rx = fbm(nx + 3.0 * qx + 1.7, ny + 3.0 * qy + 9.2, time * 0.16)
          const ry = fbm(nx + 3.0 * qx + 8.3, ny + 3.0 * qy + 2.8, time * 0.16)

          let val = fbm(nx + 3.5 * rx, ny + 3.5 * ry, time * 0.14) * 0.72 + mouseField * 0.38

          const letter = sampleMask(px, py)
          if (letter > 0.05) {
            // Keep monogram dominant over noise
            val = letter * idleBoost * 1.35 + val * 0.18 + mouseField * 0.15
          } else if (!mouseRef.current.active && skillGain < 0.2) {
            val *= 0.22 + breath * 0.05
          }

          // Soft orbital halo around PS
          const odx = px - cx
          const ody = py - cy
          const od = Math.sqrt(odx * odx + ody * ody)
          const orbitBand = Math.abs(od - orbitR)
          if (orbitBand < 10 && skillGain < 0.35) {
            const bead = 0.5 + 0.5 * Math.sin(Math.atan2(ody, odx) * 6 + time * 2.2)
            val += (1 - orbitBand / 10) * bead * 0.28 * (mouseRef.current.active ? 0.35 : 1)
          }

          const hot = skillHotspot(skillTierRef.current, px, py, width, height, time)
          if (skillGain > 0.01) {
            val += hot * skillGain * 0.95
            if (hot < 0.15) val *= 1 - skillGain * 0.35
          }

          for (const ripple of ripplesRef.current) {
            const age = (now - ripple.born) / ripple.life
            const radius = 18 + age * Math.max(width, height) * 0.55
            const rdx = px - ripple.x
            const rdy = py - ripple.y
            const rd = Math.sqrt(rdx * rdx + rdy * rdy)
            const band = Math.abs(rd - radius)
            if (band < 16) {
              val += (1 - band / 16) * (1 - age) * 0.85
            }
          }

          val *= scrollGain

          const intensity = Math.max(0, Math.min(1, (val + 0.55) * 0.78))
          if (intensity <= 0.07) continue

          const radius = Math.max(0.45, intensity * maxRadius)
          ctx.beginPath()
          ctx.arc(px, py, radius, 0, Math.PI * 2)

          if (isDark) {
            if (intensity > 0.8) {
              ctx.fillStyle = `rgba(${Math.min(255, ar + 40)}, ${Math.min(255, ag + 70)}, ${Math.min(255, ab + 30)}, ${0.92 + intensity * 0.08})`
            } else if (intensity > 0.55) {
              ctx.fillStyle = `rgba(${ar}, ${ag}, ${ab}, ${0.8 + intensity * 0.2})`
            } else if (intensity > 0.3) {
              ctx.fillStyle = `rgba(${Math.round(ar * 0.75)}, ${Math.round(ag * 0.35)}, ${Math.round(ab * 0.15)}, ${0.65 + intensity * 0.25})`
            } else {
              ctx.fillStyle = `rgba(${Math.round(ar * 0.4)}, ${Math.round(ag * 0.12)}, 0, ${intensity * 1.15})`
            }
          } else if (intensity > 0.7) {
            ctx.fillStyle = `rgba(${ar}, ${ag}, ${ab}, ${0.88 + intensity * 0.12})`
          } else if (intensity > 0.4) {
            ctx.fillStyle = `rgba(${Math.round(ar * 0.85)}, ${Math.round(ag * 0.55)}, ${Math.round(ab * 0.25)}, ${0.65 + intensity * 0.25})`
          } else {
            ctx.fillStyle = `rgba(30, 30, 30, ${intensity * 0.55})`
          }

          ctx.fill()
        }
      }

      // 8 orbit beads — slow spin, dissolves when skill hotspot is active
      if (skillGain < 0.55) {
        const beadCount = 8
        for (let b = 0; b < beadCount; b++) {
          const ang = time * 0.55 + (b / beadCount) * Math.PI * 2
          const bx = cx + Math.cos(ang) * orbitR
          const by = cy + Math.sin(ang) * orbitR
          const alpha = (1 - skillGain) * (0.35 + 0.45 * ((b % 2) + 1) * 0.35)
          ctx.beginPath()
          ctx.arc(bx, by, 1.6 + (b % 2), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${ar}, ${ag}, ${ab}, ${alpha})`
          ctx.fill()
        }
      }

      const inset = 12
      const arm = 14
      ctx.strokeStyle = `rgba(${ar}, ${ag}, ${ab}, 0.42)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(inset, inset + arm)
      ctx.lineTo(inset, inset)
      ctx.lineTo(inset + arm, inset)
      ctx.moveTo(width - inset - arm, inset)
      ctx.lineTo(width - inset, inset)
      ctx.lineTo(width - inset, inset + arm)
      ctx.moveTo(inset, height - inset - arm)
      ctx.lineTo(inset, height - inset)
      ctx.lineTo(inset + arm, height - inset)
      ctx.moveTo(width - inset - arm, height - inset)
      ctx.lineTo(width - inset, height - inset)
      ctx.lineTo(width - inset, height - inset - arm)
      ctx.stroke()

      ctx.fillStyle = isDark ? 'rgba(163, 163, 163, 0.7)' : 'rgba(82, 82, 82, 0.7)'
      ctx.font = '10px "Geist Mono", ui-monospace, monospace'
      ctx.textAlign = 'left'
      ctx.fillText(hudLabel, inset + 4, height - inset - 6)
      ctx.textAlign = 'right'
      ctx.fillText(mouseRef.current.active ? 'drag' : 'click', width - inset - 4, height - inset - 6)

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      ro.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener(FIELD_SKILL_EVENT, onSkill)
      window.removeEventListener(FIELD_RIPPLE_EVENT, onExternalRipple)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const setPointer = (clientX: number, clientY: number, active: boolean) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseRef.current.targetX = clientX - rect.left
    mouseRef.current.targetY = clientY - rect.top
    mouseRef.current.active = active
  }

  const spawnRipple = (clientX: number, clientY: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    ripplesRef.current.push({
      x: clientX - rect.left,
      y: clientY - rect.top,
      born: performance.now(),
      life: 1200,
    })
    if (ripplesRef.current.length > 6) ripplesRef.current.shift()
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => setPointer(e.clientX, e.clientY, true)}
      onMouseLeave={() => {
        mouseRef.current.active = false
        mouseRef.current.targetX = -1000
        mouseRef.current.targetY = -1000
      }}
      onMouseDown={(e) => spawnRipple(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        const t = e.touches[0]
        if (!t) return
        setPointer(t.clientX, t.clientY, true)
        spawnRipple(t.clientX, t.clientY)
      }}
      onTouchMove={(e) => {
        const t = e.touches[0]
        if (!t) return
        setPointer(t.clientX, t.clientY, true)
      }}
      onTouchEnd={() => {
        mouseRef.current.active = false
        mouseRef.current.targetX = -1000
        mouseRef.current.targetY = -1000
      }}
      className="relative w-full aspect-square max-w-[260px] sm:max-w-[380px] lg:max-w-[420px] mx-auto rounded-[14px] border border-[var(--border-subtle)] overflow-hidden transition-colors duration-300 hover:border-[var(--border-strong)] select-none touch-none"
      role="img"
      aria-label="Interactive Prakash Singh monogram field — drag and click"
    >
      <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
    </div>
  )
}
