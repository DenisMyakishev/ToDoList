import { useEffect, useState } from 'react';
import { LogoEye } from '../../assets/LogoEye';
import { INPUT_TYPE } from '../../constants/input';
import styles from './index.module.css';

const Input = ({
	name,
	label = '',
	clearByClick = false,
	guarded = false,
	onClearInput,
	errorMessage,
	forcedFocus,
	...inputProps
}) => {
	const [showGuardInput, setShowGuardInput] = useState(!guarded);
	const [focused, setFocused] = useState(false);

	useEffect(() => {
		forcedFocus && setFocused(true);
	}, [forcedFocus]);

	const handleToggleShowGuardInput = () => {
		setShowGuardInput((prev) => !prev);
	};

	const handleFocused = (e) => {
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
				type={!showGuardInput ? INPUT_TYPE.password : INPUT_TYPE.text}
				{...inputProps}
				onBlur={handleFocused}
			/>
			<span className={focused ?`${styles.errorMessage} ${styles.visibleError}` : styles.errorMessage}>{errorMessage}</span>

			{guarded && (
				<LogoEye show={showGuardInput} onClick={handleToggleShowGuardInput} />
			)}
			{clearByClick && (
				<button className={styles.clearInput} onClick={onClearInput}>
					<div className={styles.crossContainer}></div>
				</button>
			)}
		</div>
	);
};

export default Input;
