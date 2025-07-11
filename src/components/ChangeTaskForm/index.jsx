import { createRef, useContext, useState } from 'react';
import Input from '../Input';
import styles from './index.module.css';
import Button from '../Button';
import { ModalContext } from '../../context/modal.context';
import { ToDoContext } from '../../context/todo.context';
import { BUTTON_COLORS, BUTTON_TYPES, BUTTON_VIEW } from '../../constants/button';
import useValidation from '../../hooks/useValidation';

const ChangeTaskForm = ({ oldData }) => {
	const { handleCloseModal } = useContext(ModalContext);
	const { setTasks, updateTask } = useContext(ToDoContext);
	const [data, setData] = useState({
		title: oldData.title,
		description: oldData.description,
	});

	const [errors, isValid, forcedFocus, setForcedFocus] = useValidation(data, {
		title: { isEmpty: true, minLength: 5, maxLength: 16 },
		description: { isEmpty: true },
	});

	const inputs = [
		{
			name: 'title',
			label: 'Title',
			placeholder: 'Title',
			errorMessage: errors.title,
		},
		{
			name: 'description',
			label: 'Description',
			placeholder: 'Description',
			errorMessage: errors.description,
		},
	];

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isValid) {
			let newData = { id: oldData.id, ...data };
			await updateTask(newData).then(() => {
				setTasks((tasks) =>
					tasks.map((t) =>
						t.id === newData.id
							? {
									...newData,
									nodeRef: createRef(null),
									selected: oldData.selected,
							  }
							: t,
					),
				);
			});
			handleCloseModal();
		} else {
			setForcedFocus(true);
		}
	};

	return (
		<form className={styles.changeTaskForm}>
			{inputs.map((input) => (
				<Input
					key={input.name}
					{...input}
					value={data[input.name]}
					onChange={handleChange}
					forcedFocus={forcedFocus}
				/>
			))}
			<Button
				type={BUTTON_TYPES.submit}
				className={styles.submitBtn}
				color={BUTTON_COLORS.green}
				view={BUTTON_VIEW.outline}
				onClick={handleSubmit}
			>
				Change task
			</Button>
		</form>
	);
};

export default ChangeTaskForm;
