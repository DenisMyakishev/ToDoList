import { createContext, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';
import DataBase from '../API/dataBase';
import Loader from '../components/Loader';

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const signUp = async ({ email, password }) => {
		setIsLoading(true);
		await createUserWithEmailAndPassword(DataBase.auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
			});
		setIsLoading(false);
	};

	const signIn = async ({ email, password }) => {
		setIsLoading(true);
		await signInWithEmailAndPassword(DataBase.auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				setUser(user);
				return user;
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				return errorMessage;
			});
		setIsLoading(false);
	};

	const signOut = async () => {
		setIsLoading(true);
		setUser(null);
		await DataBase.auth.signOut();
		setIsLoading(false);
	};

	const checkAuth = async () => {
		setIsLoading(true);
		onAuthStateChanged(DataBase.auth, (user) => {
			if (user) {
				setUser(user);
			} else {
			}
		});
		setIsLoading(false);
	};
	return (
		<AuthContext.Provider value={{ user, signUp, signIn, signOut, checkAuth }}>
			{children}

			<Loader isLoading={isLoading} />
		</AuthContext.Provider>
	);
}
