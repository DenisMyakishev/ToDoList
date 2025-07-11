import { createContext, createRef, useContext, useEffect, useState } from 'react';
import DataBase from '../API/dataBase';
import {
	collection,
	getFirestore,
	getDocs,
	doc,
	deleteDoc,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { AuthContext } from './auth.context';
import useAsyncFunc from '../hooks/useAsyncFunc';

export const ToDoContext = createContext(null);

export function ToDoContextProvider({ children, ...props }) {
	const [tasks, setTasks] = useState([]);
	const { user } = useContext(AuthContext);
	const [searchQuery, setSearchQuery] = useState('');
	const db = getFirestore(DataBase.app);
	const condition = user !== null;

	useEffect(() => {
		if (user === null) {
			setTasks([]);
		} else {
			getTasks();
		}
	}, [user]);

	const addTask = useAsyncFunc(async (data) => {
		const taskRef = doc(db, `${user.uid}`, `${data.id}`);
		return await setDoc(taskRef, data);
	}, condition);

	const removeTask = useAsyncFunc(async (taskId) => {
		return await deleteDoc(doc(db, `${user.uid}`, taskId));
	}, condition);

	const removeSelectedTasks = useAsyncFunc(async (tasks) => {
		for (let i = 0; i < tasks.length; i++) {
			if (tasks[i].checked === true) {
				return await removeTask(tasks[i].id);
			}
		}
	}, condition);

	const updateTask = useAsyncFunc(async (updatedTask) => {
		const updatedTaskRef = doc(db, `${user.uid}`, `${updatedTask.id}`);
		return await updateDoc(updatedTaskRef, updatedTask);
	}, condition);

	const getTasks = useAsyncFunc(async () => {
		const querySnapshot = await getDocs(collection(db, user.uid));
		setTasks(
			querySnapshot.docs.map((task) => {
				return { ...task.data(), nodeRef: createRef(null) };
			}),
		);
	}, condition);

	return (
		<ToDoContext.Provider
			value={{
				tasks,
				setTasks,
				addTask,
				removeTask,
				removeSelectedTasks,
				updateTask,
				searchQuery,
				setSearchQuery,
				...props,
			}}
		>
			{children}
		</ToDoContext.Provider>
	);
}
