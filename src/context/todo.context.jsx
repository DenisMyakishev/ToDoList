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

export const ToDoContext = createContext(null);

export function ToDoContextProvider({ children, ...props }) {
	const [tasks, setTasks] = useState([]);
	const { user } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState({
		query: '',
	});

	const db = getFirestore(DataBase.app);

	const addTask = async (data) => {
		if (user?.uid) {
			setIsLoading(true);
			const taskRef = doc(db, `${user.uid}`, `${data.id}`);
			await setDoc(taskRef, data);
			setIsLoading(false);
		}
	};

	const removeTask = async (taskId) => {
		if (user?.uid) {
			setIsLoading(true);
			await deleteDoc(doc(db, `${user.uid}`, `${taskId}`));
			setIsLoading(false);
		}
	};

	const updateTask = async (updatedTask) => {
		if (user?.uid) {
			setIsLoading(true);
			const updatedTaskRef = doc(db, `${user.uid}`, `${updatedTask.id}`);
			await updateDoc(updatedTaskRef, updatedTask);
			setIsLoading(false);
		}
	};

	const getTasks = async () => {
		if (user?.uid) {
			setIsLoading(true);
			const querySnapshot = await getDocs(collection(db, user.uid));
			setTasks(
				querySnapshot.docs.map((task) => {
					return { ...task.data(), nodeRef: createRef(null) };
				}),
			);
			setIsLoading(false);
		}
	};

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

			<Loader isLoading={isLoading} />
		</ToDoContext.Provider>
	);
}
