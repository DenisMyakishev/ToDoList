import { useEffect, useRef, useState, memo } from 'react';
import LogoEye from '../../assets/LogoEye';
import { INPUT_TYPE } from '../../constants/input';
import styles from './index.module.css';

const Input = ({
	name,
	label = '',
	clearByClick = false,
	guarded = false,
	errorMessage,
	forcedFocus,
	...inputProps
}) => {
	const [isGuardInput, setIsGuardInput] = useState(guarded);
	const [focused, setFocused] = useState(false);
	const nodeRef = useRef('');

	useEffect(() => {
		forcedFocus && setFocused(true);
	}, [forcedFocus]);

	const handleToggleShowGuardInput = () => {
		setIsGuardInput((prev) => !prev);
	};

	const handleClearByClick = () => {
		const clearValue = { target: { value: '' } };
		inputProps.onChange(clearValue);
	};

	const handleFocused = () => {
		setFocused(true);
	};

	return (
		<div className={styles.inputContainer}>
			<label htmlFor={name} className={styles.loginText}>
				{label}
			</label>
			<input
				className={styles.input}
				name={name}
				id={name}
				ref={nodeRef}
				type={isGuardInput ? INPUT_TYPE.password : INPUT_TYPE.text}
				{...inputProps}
				onBlur={handleFocused}
			/>
			<span
				className={
					focused && errorMessage
						? `${styles.errorMessage} ${styles.visibleError}`
						: styles.errorMessage
				}
			>
				{focused && errorMessage ? errorMessage : '⠀'}
			</span>

			{guarded && (
				<LogoEye show={!isGuardInput} onClick={handleToggleShowGuardInput} />
			)}
			{clearByClick && (
				<button className={styles.clearInput} onClick={handleClearByClick}>
					<div className={styles.crossContainer}></div>
				</button>
			)}
		</div>
	);
};

export default memo(Input);
