// Module imports
import {
	type Meta,
	type StoryObj,
} from '@storybook/react'
import { fn } from '@storybook/test'





// Local imports
import { Button } from './Button'





const meta = {
	title: 'Button',
	component: Button,
	tags: ['autodocs'],
	args: {
		isDisabled: false,
		isLoading: false,
		isFullWidth: false,
		onClick: fn(),
		variant: 'default',
	},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		children: 'Button',
	},
}
