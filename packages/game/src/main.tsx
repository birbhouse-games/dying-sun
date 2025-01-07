// Module imports
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'





// Local imports
import { Game } from '@/components/Game/Game'

import './main.scss'





createRoot(document.getElementById('root')!).render((
	<StrictMode>
		<Game />
	</StrictMode>
))
