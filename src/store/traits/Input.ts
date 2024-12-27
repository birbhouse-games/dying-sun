// Module imports
import { trait } from 'koota'





// Local imports
import { KeyboardKeyState } from '@/typedefs/KeyboardKeyState'





export const Input = trait(() => new Map<string, KeyboardKeyState>)
