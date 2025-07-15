import { useCallback, useContext, useState } from 'react';
import Input from '../Input';
import styles from '../../main.module.css';
import localStyles from './index.module.css';
import Button from '../Button';
import { AuthContext } from '../../context/auth.context';
import { SIGN_FORMS } from '../../constants/signForms';
import { BUTTON_COLORS, BUTTON_TYPES, BUTTON_VIEW } from '../../constants/button';
import useValidation from '../../hooks/useValidation';
import { INPUT_PATTERNS } from '../../constants/input';
import Modal from '../Modal';

const AuthForm = ({ isOpen, handleCloseModal }) => {
	const { signIn, setSignForm } = useContext(AuthContext);

	const [data, setData] = useState({
		email: '',
		password: '',
	});

	const [validationErrors, isValid, forcedFocus, setForcedFocus] = useValidation(data, {
		email: { isMail: true },
		password: { minLength: 6, maxLength: 18 },
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
	];

	const handleChangeSignForm = useCallback((e) => {
		e.preventDefault();
		setSignForm(SIGN_FORMS.registration);
	}, []);

	const handleChange = useCallback((e) => {
		setData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	}, []);

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			if (isValid) {
				await signIn(data);
				handleCloseModal();
			} else {
				setForcedFocus(true);
			}
		},
		[isValid, data],
	);

	const handleResetForm = useCallback(() => {
		setSignForm(SIGN_FORMS.authentication);
		setData({
			email: '',
			password: '',
		});
	}, []);

	return (
		<Modal
			isOpen={isOpen}
			handleCloseModal={handleCloseModal}
			title={'Sign In'}
			afterAnimation={handleResetForm}
		>
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
				<a
					href=""
					onClick={handleChangeSignForm}
					className={localStyles.signUpLink}
				>
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
		</Modal>
	);
};

export default AuthForm;
