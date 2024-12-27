// Module imports
import { With } from 'miniplex'





// Local imports
import { Entity } from '@/typedefs/Entity'





export type ActorType = With<Entity, 'actorType' | 'attack' | 'bodies' | 'position' | 'speed' | 'velocity' | 'zIndex'>
