// Module imports
import {
	type PropsWithChildren,
	useMemo,
} from 'react'
import classnames from 'classnames'





// Local imports
import styles from './ButtonList.module.scss'





// Types
type Props = PropsWithChildren<{
	isFullWidth?: boolean,
}>





/** @type {React.FunctionComponent} */
export function ButtonList(props: Props) {
	const {
		children,
		isFullWidth,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames({
			[styles['container']]: true,
			[styles['is-full-width']]: isFullWidth,
		})
	}, [isFullWidth])

	return (
		<div className={compiledClassName}>
			{children}
		</div>
	)
}
