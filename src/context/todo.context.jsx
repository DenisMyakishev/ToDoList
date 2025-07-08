import { createContext, createRef, useContext, useState } from 'react';
import DataBase from '../API/dataBase';
import Loader from '../components/Loader';
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
import useAuthAsyncFunc from '../hooks/useAuthAsyncFunc';

export const ToDoContext = createContext(null);

export function ToDoContextProvider({ children, ...props }) {
	const [tasks, setTasks] = useState([]);
	const { user } = useContext(AuthContext);
	const [searchQuery, setSearchQuery] = useState('');
	const db = getFirestore(DataBase.app);
	const [addTask, addError] = useAuthAsyncFunc(async (data) => {
		const taskRef = doc(db, `${user.uid}`, `${data.id}`);
		await setDoc(taskRef, data);
	});

	const [removeTask, removeError] = useAuthAsyncFunc(async (taskId) => {
		await deleteDoc(doc(db, `${user.uid}`, `${taskId}`));
	});

	const [updateTask, updateError] = useAuthAsyncFunc(async (updatedTask) => {
		const updatedTaskRef = doc(db, `${user.uid}`, `${updatedTask.id}`);
		await updateDoc(updatedTaskRef, updatedTask);
	});

	const [getTasks, getError] = useAuthAsyncFunc(async () => {
		if (user?.uid) {
			const querySnapshot = await getDocs(collection(db, user.uid));
			setTasks(
				querySnapshot.docs.map((task) => {
					return { ...task.data(), nodeRef: createRef(null) };
				}),
			);
		} else {
		}
	});

	return (
		<ToDoContext.Provider
			value={{
				tasks,
				setTasks,
				addTask,
				getTasks,
				removeTask,
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
