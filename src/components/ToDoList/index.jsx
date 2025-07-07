import { useContext, useEffect } from 'react';
import { ToDoContext } from '../../context/todo.context';
import List from '../List';
import { AuthContext } from '../../context/auth.context';

const ToDoList = () => {
	const { tasks, setTasks, getTasks } = useContext(ToDoContext);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (user?.uid) {
			getTasks();
		} else {
			setTasks([]);
		}
	}, [user]);

	return <List elements={tasks} />;
};

export default ToDoList;
