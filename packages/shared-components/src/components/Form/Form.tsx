// Module imports
import {
	type ComponentProps,
	forwardRef,
	useMemo,
} from 'react'
import {
	motion,
	MotionProps,
} from 'motion/react'
import classnames from 'classnames'





// Local imports
import styles from './Form.module.scss'





// Types
type Props = ComponentProps<'form'> & MotionProps





export const Form = forwardRef<HTMLFormElement, Props>((props, ref) => {
	const {
		children,
		className,
	} = props

	const htmlProps = useMemo(() => {
		const result = { ...props }

		delete result.className

		return result
	}, [props])

	const compiledClassName = useMemo(() => {
		return classnames(styles['container'], className)
	}, [className])

	return (
		<motion.form
			ref={ref}
			{...htmlProps}
			className={compiledClassName}>
			{children}
		</motion.form>
	)
})

Form.displayName = 'Form'
