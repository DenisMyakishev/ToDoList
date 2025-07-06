import List from '../../components/List';
import styles from './index.module.css';

const ToDo = () => {
	const tasks = []
	return (
		<main className={styles.toDo}>
			<div className={`container ${styles.toDoContainer}`}>
				<h3 className={styles.toDoTitle}>ToDo List</h3>
				<List elements={tasks}></List>
			</div>
		</main>
	);
};

export default ToDo;
