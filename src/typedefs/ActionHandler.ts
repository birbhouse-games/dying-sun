export type ActionHandler = {
	isRepeatable: boolean,
	onActivate: (..._args: unknown[]) => void,
	onDeactivate?: (..._args: unknown[]) => void,
	repeatFrequency?: number,
}
