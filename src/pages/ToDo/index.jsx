import List from '../../components/List';
import styles from './index.module.css';
import Button from '../../components/Button/index';
import { useContext, useState } from 'react';
import Modal from '../../components/Modal';
import AddTaskModal from '../../components/AddTaskForm';
import { ToDoContext, ToDoContextProvider } from '../../context/todo.context';
import ToDoList from '../../components/ToDoList';

const ToDo = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	return (
		<ToDoContextProvider>
			<main className={styles.toDo}>
				<div className={`container ${styles.toDoContainer}`}>
					<h3 className={styles.toDoTitle}>ToDo List</h3>
					<Button color="green" view="outline" onClick={handleOpenModal}>
						Add
					</Button>
					<Modal
						isOpen={isOpen}
						handleCloseModal={handleCloseModal}
						title="Add"
					>
						<AddTaskModal />
					</Modal>
					<ToDoList />
				</div>
			</main>
		</ToDoContextProvider>
	);
};

export default ToDo;
