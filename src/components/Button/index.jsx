import { memo, useMemo, useState } from 'react';
import { BUTTON_DISPLAYCLASSES, BUTTON_TYPES } from '../../constants/button';
import styles from './index.module.css';

const Button = ({
	children,
	onClick,
	type = BUTTON_TYPES.button,
	className = '',
	disabled,
	...props
}) => {
	const classes = [className, styles.branded];
	for (let key in props) {
		if (BUTTON_DISPLAYCLASSES.includes(key)) {
			classes.push(styles[`${props[key]}`]);
		}
	}

	const handleClick = (e) => {
		e.stopPropagation();
		onClick(e);
	};

	return (
		<button
			type={type}
			onClick={handleClick}
			className={classes.join(' ')}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default memo(Button);
