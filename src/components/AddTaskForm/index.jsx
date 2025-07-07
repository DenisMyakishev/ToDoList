import { createRef, useContext, useState } from 'react';
import Input from '../Input';
import styles from './index.module.css';
import Button from '../Button';
import { ModalContext } from '../../context/modal.context';
import * as uuid from 'uuid';
import { ToDoContext } from '../../context/todo.context';

const AddTaskForm = () => {
	const { handleCloseModal } = useContext(ModalContext);
	const { addTask, setTasks } = useContext(ToDoContext);
	const [data, setData] = useState({
		title: '',
		description: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		let newData = { id: uuid.v4(), ...data };
		setTasks((prev) => [{ ...newData, nodeRef: createRef(null) }, ...prev]);
		handleCloseModal();
		await addTask(newData);
	};

	return (
		<form className={styles.addTaskForm}>
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

export default AddTaskForm;
