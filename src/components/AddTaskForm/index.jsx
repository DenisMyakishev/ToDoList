import { createRef, useCallback, useContext, useState } from 'react';
import Input from '../Input';
import styles from '../../main.module.css';
import Button from '../Button';
import * as uuid from 'uuid';
import { ToDoContext } from '../../context/todo.context';
import { BUTTON_COLORS, BUTTON_TYPES, BUTTON_VIEW } from '../../constants/button';
import useValidation from '../../hooks/useValidation';
import { INPUT_PATTERNS } from '../../constants/input';
import Modal from '../Modal';

const AddTaskForm = ({ isOpen, handleCloseModal }) => {
	const { addTask, setTasks } = useContext(ToDoContext);
	const [data, setData] = useState({
		title: '',
		description: '',
	});

	const [validationErrors, isValid, forcedFocus, setForcedFocus] = useValidation(data, {
		title: { isEmpty: true, minLength: 5, maxLength: 16 },
		description: { isEmpty: true },
	});

	const inputs = [
		{
			...INPUT_PATTERNS.title,
			errorMessage: validationErrors.title,
		},
		{
			...INPUT_PATTERNS.description,
			errorMessage: validationErrors.description,
		},
	];

	const handleChange = useCallback((e) => {
		setData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	}, []);

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			if (isValid) {
				let newData = {
					id: uuid.v4(),
					creationDate: new Date().valueOf(),
					...data,
				};
				await addTask(newData).then(() => {
					setTasks((tasks) => [
						{ ...newData, nodeRef: createRef(null) },
						...tasks,
					]);
				});
				handleCloseModal();
			} else {
				setForcedFocus(true);
			}
		},
		[isValid, data],
	);

	const handleResetForm = useCallback(() => {
		setData({
			title: '',
			description: '',
		});
	}, []);

	return (
		<Modal
			isOpen={isOpen}
			handleCloseModal={handleCloseModal}
			afterAnimation={handleResetForm}
			title="Add"
		>
			<form className={styles.modalForm}>
				{inputs.map((input) => (
					<Input
						key={input.name}
						{...input}
						forcedFocus={forcedFocus}
						value={data[input.name]}
						onChange={handleChange}
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
		</Modal>
	);
};

export default AddTaskForm;
