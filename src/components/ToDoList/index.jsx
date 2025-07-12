import List from '../List';
import styles from './index.module.css';
import useSearchSortQuery from '../../hooks/useSearchSortQuery';

const ToDoList = () => {
	const [searchedTasks] = useSearchSortQuery();

	return <List elements={searchedTasks} />;
};

export default ToDoList;
