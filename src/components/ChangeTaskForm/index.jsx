import { createRef, useContext, useState } from 'react';
import Input from '../Input';
import styles from './index.module.css';
import Button from '../Button';
import { ModalContext } from '../../context/modal.context';
import { ToDoContext } from '../../context/todo.context';
import { BUTTON_COLORS, BUTTON_TYPES, BUTTON_VIEW } from '../../constants/button';

const ChangeTaskForm = ({ oldData }) => {
	const { handleCloseModal } = useContext(ModalContext);
	const { setTasks, updateTask } = useContext(ToDoContext);
	const [data, setData] = useState({
		title: oldData.title,
		description: oldData.description,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		let newData = { id: oldData.id, ...data };
		setTasks((tasks) =>
			tasks.map((t) =>
				t.id === newData.id
					? { ...newData, nodeRef: createRef(null), checked: oldData.checked }
					: t,
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
				type={BUTTON_TYPES.submit}
				className={styles.submitBtn}
				color={BUTTON_COLORS.green}
				view={BUTTON_VIEW.outline}
				onClick={handleSubmit}
			>
				Add new task
			</Button>
		</form>
	);
};

export default ChangeTaskForm;
