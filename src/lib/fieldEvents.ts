export type FieldSkillTier =
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'Databases & Cache'
  | 'Cloud & DevOps'
  | 'Product & Commerce'
  | 'Tools & Workflow'
  | null

export const FIELD_SKILL_EVENT = 'portfolio-field-skill'
export const FIELD_RIPPLE_EVENT = 'portfolio-field-ripple'

export function setFieldSkill(tier: FieldSkillTier) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent(FIELD_SKILL_EVENT, { detail: { tier } }),
  )
}

export function triggerFieldRipple(origin: 'case-study' | 'manual' = 'manual') {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent(FIELD_RIPPLE_EVENT, { detail: { origin } }),
  )
}
