import { useContext, useState } from 'react';
import Input from '../Input';
import styles from './index.module.css';
import Button from '../Button';
import { ModalContext } from '../../context/modal.context';
import { AuthContext } from '../../context/auth.context';

const RegForm = () => {
	const { handleCloseModal } = useContext(ModalContext);
	const { signUp } = useContext(AuthContext);
	const [data, setData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleCloseModal();
		if (data.password === data.confirmPassword) {
			await signUp({ email: data.email, password: data.password });
		}
	};

	return (
		<form className={styles.addTaskForm}>
			<Input name="email" label="email" value={data} handleChange={setData} />
			<Input
				name="password"
				label="Password"
				value={data}
				handleChange={setData}
				guarded={true}
			/>
			<Input
				name="confirmPassword"
				label="Confirm password"
				value={data}
				handleChange={setData}
				guarded={true}
			/>
			<Button
				type="submit"
				className={styles.submitBtn}
				color="green"
				view="outline"
				onClick={handleSubmit}
			>
				Sign Up
			</Button>
		</form>
	);
};

export default RegForm;
