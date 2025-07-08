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
		handleChange((prev) => {
			return { ...prev, [`${name}`]: '' };
		});
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
				value={value[`${name}`]}
				required={required}
				placeholder={placeholder !== '' ? placeholder : label.toLocaleLowerCase()}
				type={!showGuardInput ? INPUT_TYPE.password : INPUT_TYPE.text}
				onChange={(e) => {
					handleChange((prev) => {
						return { ...prev, [`${name}`]: e.target.value };
					});
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
