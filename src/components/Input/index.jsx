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
}) => {
	const [showGuardInput, setShowGuardInput] = useState(!guarded);

	const handleToggleShowGuardInput = () => {
		setShowGuardInput((prev) => !prev);
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
				placeholder={label.toLocaleLowerCase()}
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
		</div>
	);
};

export default Input;
