// Module imports
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'





// Local imports
import { Game } from '@/components/Game/Game.tsx'

// import './index.css'





createRoot(document.getElementById('root')!).render((
	<StrictMode>
		<Game />
	</StrictMode>
))
