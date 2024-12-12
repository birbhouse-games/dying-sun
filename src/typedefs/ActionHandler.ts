export type ActionHandler = {
  isRepeatable: boolean,
  onActivate: (...args: unknown[]) => void,
  onDeactivate?: (...args: unknown[]) => void,
  repeatFrequency?: number,
}
