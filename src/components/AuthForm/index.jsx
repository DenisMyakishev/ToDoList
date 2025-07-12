import {useContext, useState } from 'react';
import Input from '../Input';
import styles from '../../main.module.css';
import localStyles from './index.module.css';
import Button from '../Button';
import { ModalContext } from '../../context/modal.context';
import { AuthContext } from '../../context/auth.context';
import { SIGN_FORMS } from '../../constants/signForms';
import { BUTTON_COLORS, BUTTON_TYPES, BUTTON_VIEW } from '../../constants/button';
import useValidation from '../../hooks/useValidation';
import { INPUT_PATTERNS } from '../../constants/input';

const AuthForm = () => {
	const { handleCloseModal } = useContext(ModalContext);
	const { signIn, setSignForm } = useContext(AuthContext);

	const [data, setData] = useState({
		email: '',
		password: '',
	});

	const [errors, isValid, forcedFocus, setForcedFocus] = useValidation(data, {
		email: { isMail: true },
		password: { minLength: 6, maxLength: 18 },
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
	];

	const handleChangeSignForm = (e) => {
		e.preventDefault();
		setSignForm(SIGN_FORMS.registration);
	};

	const handleChange = (e) => {
		setData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isValid) {
			await signIn(data);
			handleCloseModal();
		} else {
			setForcedFocus(true);
		}
	};

	return (
		<form className={styles.modalForm}>
			{inputs.map((input) => (
				<Input
					key={input.name}
					{...input}
					value={data[input.name]}
					onChange={handleChange}
					forcedFocus={forcedFocus}
				/>
			))}
			<a href="" onClick={handleChangeSignForm} className={localStyles.signUpLink}>
				Sign Up
			</a>
			<Button
				type={BUTTON_TYPES.submit}
				className={styles.submitBtn}
				color={BUTTON_COLORS.green}
				view={BUTTON_VIEW.outline}
				onClick={handleSubmit}
			>
				Sign In
			</Button>
		</form>
	);
};

export default AuthForm;
