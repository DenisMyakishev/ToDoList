import { useContext, useState } from 'react';
import Input from '../Input';
import styles from './index.module.css';
import Button from '../Button';
import { ModalContext } from '../../context/modal.context';
import { AuthContext } from '../../context/auth.context';

const AuthForm = () => {
	const { handleCloseModal } = useContext(ModalContext);
	const [data, setData] = useState({
		email: '',
		password: '',
	});
	const { signIn } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleCloseModal();
		await signIn(data);
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
			<Button
				type="submit"
				className={styles.submitBtn}
				color="green"
				view="outline"
				onClick={handleSubmit}
			>
				Sign In
			</Button>
		</form>
	);
};

export default AuthForm;
