import { useContext, useState } from 'react';
import Input from '../Input';
import styles from './index.module.css';
import Button from '../Button';
import { ModalContext } from '../../context/modal.context';

const ChangeTaskForm = ({ id, setFunction }) => {
	const { handleCloseModal } = useContext(ModalContext);
	const [data, setData] = useState({
		title: '',
		description: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		setFunction({ id: id, ...data });
		handleCloseModal();
	};

	return (
		<form className={styles.changeTaskForm}>
			<Input name="title" label="Title" value={data} handleChange={setData} />
			<Input
				name="description"
				label="Description"
				value={data}
				handleChange={setData}
			/>
			<Button
				type="submit"
				className={styles.submitBtn}
				color="green"
				view="outline"
				onClick={handleSubmit}
			>
				Add new task
			</Button>
		</form>
	);
};

export default ChangeTaskForm;
