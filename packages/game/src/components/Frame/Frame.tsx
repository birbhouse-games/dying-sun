// Module imports
import {
	type PropsWithChildren,
	useMemo,
} from 'react'
import classnames from 'classnames'





// Local imports
import styles from './Frame.module.scss'





// Types
type Props = PropsWithChildren<{
	className?: string
}>





/** @type {React.FunctionComponent} */
export function Frame(props: Props) {
	const {
		children,
		className,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames(styles['container'], className)
	}, [className])

	return (
		<div className={compiledClassName}>
			{children}
		</div>
	)
}
