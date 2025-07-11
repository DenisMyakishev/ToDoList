import { useContext, useState } from 'react';
import Input from '../Input';
import styles from './index.module.css';
import Button from '../Button';
import { ModalContext } from '../../context/modal.context';
import { AuthContext } from '../../context/auth.context';
import { BUTTON_COLORS, BUTTON_TYPES, BUTTON_VIEW } from '../../constants/button';
import useValidation from '../../hooks/useValidation';
import { INPUT_PATTERNS } from '../../constants/input';

const RegForm = () => {
	const { handleCloseModal } = useContext(ModalContext);
	const { signUp } = useContext(AuthContext);
	const [data, setData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [errors, isValid, forcedFocus, setForcedFocus] = useValidation(data, {
		email: { isMail: true },
		password: { minLength: 6, maxLength: 18 },
		confirmPassword: { confirmPassword: data.password },
	});

	const inputs = [
		{
			...INPUT_PATTERNS.email,
			errorMessage: errors.email,
		},
		{
			...INPUT_PATTERNS.password,
			errorMessage: errors.password,
		},
		{
			...INPUT_PATTERNS.confirmPassword,
			errorMessage: errors.confirmPassword,
		},
	];

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isValid) {
			await signUp({ email: data.email, password: data.password });
			handleCloseModal();
		} else {
			setForcedFocus(true);
		}
	};

	return (
		<form className={styles.addTaskForm}>
			{inputs.map((input) => (
				<Input
					key={input.name}
					{...input}
					value={data[input.name]}
					onChange={handleChange}
					forcedFocus={forcedFocus}
				/>
			))}
			<Button
				type={BUTTON_TYPES.button}
				className={styles.submitBtn}
				color={BUTTON_COLORS.green}
				view={BUTTON_VIEW.outline}
				onClick={handleSubmit}
			>
				Sign Up
			</Button>
		</form>
	);
};

export default RegForm;
