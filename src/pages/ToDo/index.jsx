import List from '../../components/List';
import styles from './index.module.css';
import Button from '../../components/Button/index';
import { useState } from 'react';
import Modal from '../../components/Modal';
import AddTaskModal from '../../components/AddTaskForm';

const ToDo = () => {
	const [tasks, setTasks] = useState([
		{ id: 1, title: 'title1', description: `description1` },
		{ id: 2, title: 'title2', description: `description2` },
		{ id: 3, title: 'title3', description: `description3` },
		{ id: 4, title: 'title4', description: `description4` },
		{ id: 5, title: 'title5', description: `description5` },
	]);

	const [isOpen, setIsOpen] = useState(false);

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	const handleRemoveElement = (removeId) => {
		setTasks(tasks.filter((t) => t.id !== removeId));
	};

	const handleChangeElement = (changetData) => {
		setTasks(
			tasks.map((t) => (t.id === changetData.id ? { ...changetData } : { ...t })),
		);
	};

	return (
		<main className={styles.toDo}>
			<div className={`container ${styles.toDoContainer}`}>
				<h3 className={styles.toDoTitle}>ToDo List</h3>
				<Button color="green" view="outline" onClick={() => setIsOpen(true)}>
					Add
				</Button>
				<Modal isOpen={isOpen} handleCloseModal={handleCloseModal} title="Add">
					<AddTaskModal setFunction={setTasks} />
				</Modal>
				<List
					elements={tasks}
					handleRemoveElement={handleRemoveElement}
					handleChangeElement={handleChangeElement}
				/>
			</div>
		</main>
	);
};

export default ToDo;
