import { useCallback, useContext, useState } from 'react';
import Input from '../Input';
import styles from './index.module.css';
import Button from '../Button';
import { AuthContext } from '../../context/auth.context';
import { BUTTON_COLORS, BUTTON_TYPES, BUTTON_VIEW } from '../../constants/button';
import useValidation from '../../hooks/useValidation';
import { INPUT_PATTERNS } from '../../constants/input';
import Modal from '../Modal';
import { SIGN_FORMS } from '../../constants/signForms';

const RegForm = ({ isOpen, handleCloseModal }) => {
	const { signUp, setSignForm } = useContext(AuthContext);
	const [data, setData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [validationErrors, isValid, forcedFocus, setForcedFocus] = useValidation(data, {
		email: { isMail: true },
		password: { minLength: 6, maxLength: 18 },
		confirmPassword: { confirmPassword: data.password },
	});

	const inputs = [
		{
			...INPUT_PATTERNS.email,
			errorMessage: validationErrors.email,
		},
		{
			...INPUT_PATTERNS.password,
			errorMessage: validationErrors.password,
		},
		{
			...INPUT_PATTERNS.confirmPassword,
			errorMessage: validationErrors.confirmPassword,
		},
	];

	const handleChange = useCallback((e) => {
		setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isValid) {
			await signUp({ email: data.email, password: data.password });
			handleCloseModal();
		} else {
			setForcedFocus(true);
		}
	};

	const handleResetForm = () => {
		setSignForm(SIGN_FORMS.authentication);
		setData({
			email: '',
			password: '',
			confirmPassword: '',
		});
	};

	return (
		<Modal
			isOpen={isOpen}
			handleCloseModal={handleCloseModal}
			title={'Sign Up'}
			afterAnimation={handleResetForm}
		>
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
		</Modal>
	);
};

export default RegForm;
