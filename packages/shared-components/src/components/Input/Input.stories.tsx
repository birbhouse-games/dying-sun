// Module imports
import {
	type Meta,
	type StoryObj,
} from '@storybook/react'
import { fn } from '@storybook/test'





// Local imports
import { Input } from './Input'





const meta = {
	title: 'Input',
	component: Input,
	parameters: {
	},
	tags: ['autodocs'],
	args: {
		isDisabled: false,
		onChange: fn(),
	},
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		label: 'Input Label',
	},
}
