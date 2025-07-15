import { memo, useCallback, useContext, useEffect, useState } from 'react';
import Input from '../Input';
import styles from '../../main.module.css';
import Button from '../Button';
import { ToDoContext } from '../../context/todo.context';
import { BUTTON_COLORS, BUTTON_TYPES, BUTTON_VIEW } from '../../constants/button';
import useValidation from '../../hooks/useValidation';
import { INPUT_PATTERNS } from '../../constants/input';
import Modal from '../Modal';

const ChangeTaskForm = ({ isOpen, handleCloseModal, oldData }) => {
	const { setTasks, updateTask } = useContext(ToDoContext);

	const [data, setData] = useState({
		title: oldData.title || '',
		description: oldData.description || '',
	});

	useEffect(() => {
		setData({
			title: oldData.title || '',
			description: oldData.description || '',
		});
	}, [oldData]);

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
		setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}, []);

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			if (isValid) {
				let newData = {
					id: oldData.id,
					creationDate: oldData.creationDate,
					...data,
				};
				await updateTask(newData).then(() => {
					setTasks((prev) =>
						prev.map((t) =>
							t.id === newData.id
								? {
										...oldData,
										...newData,
								  }
								: t,
						),
					);
				});
				handleCloseModal();
			} else {
				setForcedFocus(true);
			}
		},
		[isValid, data],
	);

	return (
		<Modal title="Change" isOpen={isOpen} handleCloseModal={handleCloseModal}>
			<form className={styles.modalForm}>
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
		</Modal>
	);
};

export default memo(ChangeTaskForm);
