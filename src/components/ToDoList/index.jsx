import List from '../List';
import useSearchSortQuery from '../../hooks/useSearchSortQuery';
import { memo } from 'react';

const ToDoList = () => {
	const [searchedTasks] = useSearchSortQuery();

	return <List elements={searchedTasks} />;
};

export default memo(ToDoList);
