import { useContext, useEffect, useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import styles from './index.module.css';
import Modal from '../Modal';
import AddTaskForm from '../AddTaskForm';
import { ToDoContext } from '../../context/todo.context';

const ToDoActions = () => {
	const { setSearchQuery, searchQuery, removeTask, tasks, setTasks } =
		useContext(ToDoContext);
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	const handleRemoveSelected = () => {
		const newTasks = tasks
			.map((p) => {
				if (p.checked === true) {
					removeTask(p.id);
					return null;
				} else {
					return p;
				}
			})
			.filter((t) => t !== null && t);
		setTasks(newTasks);
	};

	return (
		<>
			<div className={styles.actions}>
				<Button color="green" view="outline" onClick={handleOpenModal}>
					Add
				</Button>
				<Button color="red" view="outline" onClick={handleRemoveSelected}>
					Remove selected
				</Button>
				<Input
					name="query"
					value={searchQuery}
					handleChange={setSearchQuery}
					placeholder="Search"
					clearByClick={true}
					className={styles.search}
				/>
			</div>
			<Modal isOpen={isOpen} handleCloseModal={handleCloseModal} title="Add">
				<AddTaskForm />
			</Modal>
		</>
	);
};

export default ToDoActions;
