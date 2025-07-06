import styles from './index.module.css';

const Input = ({ name, value, label = '', required = false, handleChange }) => {
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
				onChange={(e) => {
					handleChange((prev) => {
						return { ...prev, [`${name}`]: e.target.value };
					});
				}}
			/>
		</div>
	);
};

export default Input;
