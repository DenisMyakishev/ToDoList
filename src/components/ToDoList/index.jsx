import { useContext, useEffect } from 'react';
import { ToDoContext } from '../../context/todo.context';
import List from '../List';
import { AuthContext } from '../../context/auth.context';

const ToDoList = () => {
	const { tasks, setTasks, getTasks, searchQuery } = useContext(ToDoContext);
	const { user } = useContext(AuthContext);
	const searchedTasks = tasks.filter(
		(t) =>
			(t?.title.includes(searchQuery.query) ||
				t?.description.includes(searchQuery.query)) && {
				...t,
			},
	);

	useEffect(() => {
		if (user?.uid) {
			getTasks();
		} else {
			setTasks([]);
		}
	}, [user]);

	return <List elements={searchedTasks} />;
};

export default ToDoList;
