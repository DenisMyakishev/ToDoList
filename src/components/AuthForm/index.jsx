import { useContext, useState } from 'react';
import Input from '../Input';
import styles from './index.module.css';
import Button from '../Button';
import { ModalContext } from '../../context/modal.context';
import { AuthContext } from '../../context/auth.context';
import { SIGN_FORMS } from '../../constants/signForms';
import { BUTTON_COLORS, BUTTON_TYPES, BUTTON_VIEW } from '../../constants/button';

const AuthForm = () => {
	const { handleCloseModal } = useContext(ModalContext);
	const { signIn, setSignForm } = useContext(AuthContext);

	const [data, setData] = useState({
		email: '',
		password: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleCloseModal();
		await signIn(data);
	};

	const handleChangeSignForm = (e) => {
		e.preventDefault();
		setSignForm(SIGN_FORMS.registration);
	};

	return (
		<>
			<form className={styles.addTaskForm}>
				<Input name="email" label="email" value={data} handleChange={setData} />
				<Input
					name="password"
					label="Password"
					value={data}
					handleChange={setData}
					guarded={true}
				/>
				<a href="" onClick={handleChangeSignForm} className={styles.signUpLink}>
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
		</>
	);
};

export default AuthForm;
