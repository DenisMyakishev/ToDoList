import { useContext, useEffect, useState } from 'react';
import { ToDoContext } from '../../context/todo.context';
import List from '../List';
import { AuthContext } from '../../context/auth.context';

const ToDoList = () => {
	const { tasks, setTasks, getTasks, searchQuery } = useContext(ToDoContext);
	const { user } = useContext(AuthContext);
	const [searchedTasks, setSearchedTasks] = useState([]);

	useEffect(() => {
		getTasks();
		if (user === null) {
			setTasks([]);
		}
	}, [user]);

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
