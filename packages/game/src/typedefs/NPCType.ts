// Module imports
import { With } from 'miniplex'





// Local imports
import { ActorType } from '@/typedefs/ActorType'





export type NPCType = With<ActorType, 'behaviorTree' | 'destination'>
