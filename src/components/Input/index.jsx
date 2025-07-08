import { useState } from 'react';
import { LogoEye } from '../../assets/LogoEye';
import { INPUT_TYPE } from '../../constants/input';
import styles from './index.module.css';

const Input = ({
	name,
	value,
	label = '',
	required = false,
	handleChange,
	guarded = false,
	placeholder = '',
	clearByClick = false,
}) => {
	const [showGuardInput, setShowGuardInput] = useState(!guarded);

	const handleToggleShowGuardInput = () => {
		setShowGuardInput((prev) => !prev);
	};

	const handleClearInput = () => {
		currentHandleChange('');
	};

	const isObjectValue = typeof value === 'object';
	const currentValue = isObjectValue ? value[`${name}`] : value;
	const currentPlaceholder =
		placeholder !== '' ? placeholder : label.toLocaleLowerCase();

	const currentHandleChange = (value) => {
		if (isObjectValue) {
			handleChange((prev) => {
				return { ...prev, [`${name}`]: value };
			});
		} else {
			handleChange(value);
		}
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
				value={currentValue}
				required={required}
				placeholder={currentPlaceholder}
				type={!showGuardInput ? INPUT_TYPE.password : INPUT_TYPE.text}
				onChange={(e) => {
					currentHandleChange(e.target.value);
				}}
			/>
			{guarded && (
				<LogoEye show={showGuardInput} onClick={handleToggleShowGuardInput} />
			)}
			{clearByClick && (
				<button className={styles.clearInput} onClick={handleClearInput}>
					<div className={styles.crossContainer}></div>
				</button>
			)}
		</div>
	);
};

export default Input;
