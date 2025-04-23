// Module imports
import { type Preview } from '@storybook/react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'





// Local imports
import { GlobalStyles } from '../src/components/GlobalStyles/GlobalStyles'

import './preview.scss'





const preview: Preview = {
	decorators: [
		Story => (
			<GlobalStyles>
				<Story />
			</GlobalStyles>
		),
	],
	parameters: {
		backgrounds: {
			values: [
				// 👇 Default values
				{
					name: 'Dark',
					value: 'black',
				},
			],
			// 👇 Specify which background is shown by default
			default: 'Dark',
		},
		controls: {
			matchers: {
				color: /(background|color)$/iu,
				date: /date$/iu,
			},
		},
	},
}

export default preview
