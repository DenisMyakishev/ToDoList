import List from '../List';
import useSearchSortQuery from '../../hooks/useSearchSortQuery';

const ToDoList = () => {
	const [searchedTasks] = useSearchSortQuery();

	return <List elements={searchedTasks} />;
};

export default ToDoList;
