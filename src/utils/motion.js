// On phones (and for users who ask for less motion) scroll-driven reveals and
// pinning feel laggy: content waits for a trigger before appearing. There we
// skip them and show everything immediately.
export const LITE_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)').matches
