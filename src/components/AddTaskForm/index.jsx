import { createRef, useContext, useState } from 'react';
import Input from '../Input';
import styles from './index.module.css';
import Button from '../Button';
import { ModalContext } from '../../context/modal.context';
import * as uuid from 'uuid';
import { ToDoContext } from '../../context/todo.context';
import { BUTTON_COLORS, BUTTON_TYPES, BUTTON_VIEW } from '../../constants/button';
import useValidation from '../../hooks/useValidation';

const AddTaskForm = () => {
	const { handleCloseModal } = useContext(ModalContext);
	const { addTask, setTasks } = useContext(ToDoContext);
	const [data, setData] = useState({
		title: '',
		description: '',
	});

	const [errors, isValid, forcedFocus, setForcedFocus] = useValidation(data, {
		title: { isEmpty: true, minLength: 5, maxLength: 16 },
		description: { isEmpty: true },
	});

	const inputs = [
		{
			name: 'title',
			label: 'Title',
			type: 'text',
			placeholder: 'title',
			errorMessage: errors.title,
		},
		{
			name: 'description',
			label: 'Description',
			type: 'text',
			placeholder: 'description',
			errorMessage: errors.description,
		},
	];

	const onChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isValid) {
			let newData = { id: uuid.v4(), ...data };
			setTasks((tasks) => [{ ...newData, nodeRef: createRef(null) }, ...tasks]);
			handleCloseModal();
			await addTask(newData);
		} else {
			setForcedFocus(true);
		}
	};

	return (
		<form className={styles.addTaskForm}>
			{inputs.map((input) => (
				<Input
					key={input.name}
					{...input}
					forcedFocus={forcedFocus}
					value={data[input.name]}
					onChange={onChange}
				/>
			))}
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

export default AddTaskForm;
