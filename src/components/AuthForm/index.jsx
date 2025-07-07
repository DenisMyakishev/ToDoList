import { useContext, useState } from 'react';
import Input from '../Input';
import styles from './index.module.css';
import Button from '../Button';
import { ModalContext } from '../../context/modal.context';

const AuthForm = ({ setFunction = () => {} }) => {
	const { handleCloseModal } = useContext(ModalContext);
	const [data, setData] = useState({
		login: '',
		password: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		setFunction();
		handleCloseModal();
	};

	return (
		<form className={styles.addTaskForm}>
			<Input name="login" label="Login" value={data} handleChange={setData} />
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
