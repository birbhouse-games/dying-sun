// Local imports
import { ACTION_NAMES } from '@/constants/ACTION_NAMES.ts'





export const KEY_BINDINGS: Record<string, ACTION_NAMES> = {
	// ' ': ACTION_NAMES.ATTACK,
	'a': ACTION_NAMES.MOVE_WEST,
	'd': ACTION_NAMES.MOVE_EAST,
	's': ACTION_NAMES.MOVE_SOUTH,
	'w': ACTION_NAMES.MOVE_NORTH,
}
