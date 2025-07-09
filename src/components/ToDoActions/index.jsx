import { useContext, useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import styles from './index.module.css';
import Modal from '../Modal';
import AddTaskForm from '../AddTaskForm';
import { ToDoContext } from '../../context/todo.context';
import { BUTTON_COLORS, BUTTON_VIEW } from '../../constants/button';

const ToDoActions = () => {
	const { setSearchQuery, searchQuery, removeTask, setTasks } = useContext(ToDoContext);
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	const handleRemoveSelected = () => {
		setTasks((tasks) =>
			tasks
				.map((t) => {
					if (t.checked === true) {
						removeTask(t.id);
						return null;
					} else {
						return t;
					}
				})
				.filter((t) => t !== null && t),
		);
	};

	const handleChange = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		<>
			<div className={styles.actions}>
				<Button
					color={BUTTON_COLORS.green}
					view={BUTTON_VIEW.outline}
					onClick={handleOpenModal}
				>
					Add
				</Button>
				<Button
					color={BUTTON_COLORS.red}
					view={BUTTON_VIEW.outline}
					onClick={handleRemoveSelected}
				>
					Remove selected
				</Button>
				<Input
					name="query"
					value={searchQuery}
					placeholder="Search"
					clearByClick
					onClearInput={() => setSearchQuery('')}
					onChange={handleChange}
				/>
			</div>
			<Modal isOpen={isOpen} handleCloseModal={handleCloseModal} title="Add">
				<AddTaskForm />
			</Modal>
		</>
	);
};

export default ToDoActions;
