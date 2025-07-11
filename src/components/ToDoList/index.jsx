import { useContext, useEffect, useState } from 'react';
import { ToDoContext } from '../../context/todo.context';
import List from '../List';

const ToDoList = () => {
	const { tasks, searchQuery } = useContext(ToDoContext);
	const [searchedTasks, setSearchedTasks] = useState([]);

	useEffect(() => {
		setSearchedTasks(
			tasks.filter(
				(t) =>
					(t?.title.includes(searchQuery) ||
						t?.description.includes(searchQuery)) &&
					t,
			),
		);
	}, [tasks, searchQuery]);

	return <List elements={searchedTasks} />;
};

export default ToDoList;
