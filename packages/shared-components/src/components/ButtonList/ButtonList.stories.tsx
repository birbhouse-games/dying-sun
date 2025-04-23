// Module imports
import {
	type Meta,
	type StoryObj,
} from '@storybook/react'





// Local imports
import { Button } from '../Button/Button'
import { ButtonList } from './ButtonList'





const meta = {
	title: 'ButtonList',
	component: ButtonList,
	tags: ['autodocs'],
	args: {
		isFullWidth: false,
	},
} satisfies Meta<typeof ButtonList>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		children: (
			<>
				<Button>{'Button 1'}</Button>
				<Button>{'Button 2'}</Button>
				<Button>{'Button 3'}</Button>
			</>
		),
	},
}
