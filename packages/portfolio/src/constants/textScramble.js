// Baseline pair: interval scales proportionally when an instance sets a different duration.
export const SCRAMBLE_DEFAULT_DURATION_MS = 1000
export const SCRAMBLE_INTERVAL_MS = 128

export function scrambleIntervalForDuration(duration = SCRAMBLE_DEFAULT_DURATION_MS) {
  return (SCRAMBLE_INTERVAL_MS / SCRAMBLE_DEFAULT_DURATION_MS) * duration
}
