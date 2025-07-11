import styles from './index.module.css';
import { ToDoContextProvider } from '../../context/todo.context';
import ToDoList from '../../components/ToDoList';
import ToDoActions from '../../components/ToDoActions';

const ToDo = () => {
	return (
		<ToDoContextProvider>
			<main className={styles.toDo}>
				<div className={`container ${styles.toDoContainer}`}>
					<h3 className={styles.toDoTitle}>ToDo List</h3>
					<ToDoActions />
					<ToDoList />
				</div>
			</main>
		</ToDoContextProvider>
	);
};

export default ToDo;
