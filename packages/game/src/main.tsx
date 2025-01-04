// Module imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'





// Local imports
import { Game } from '@/components/Game/Game.tsx'

// import './index.css'





createRoot(document.getElementById('root')!).render((
  <StrictMode>
    <Game />
  </StrictMode>
))
