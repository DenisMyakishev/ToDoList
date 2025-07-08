import { createRef, useContext, useState } from 'react';
import Input from '../Input';
import styles from './index.module.css';
import Button from '../Button';
import { ModalContext } from '../../context/modal.context';
import { ToDoContext } from '../../context/todo.context';

const ChangeTaskForm = ({ oldData }) => {
	const { handleCloseModal } = useContext(ModalContext);
	const { setTasks, updateTask } = useContext(ToDoContext);
	const [data, setData] = useState({
		title: oldData.title,
		description: oldData.description,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		let newData = { id: oldData.id, ...data, checked: oldData.checked };
		setTasks((prev) =>
			prev.map((t) =>
				t.id === newData.id ? { ...newData, nodeRef: createRef(null) } : { ...t },
			),
		);
		handleCloseModal();
		await updateTask(newData);
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
