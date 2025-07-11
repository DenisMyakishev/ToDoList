import { createContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';
import DataBase from '../API/dataBase';
import { SIGN_FORMS } from '../constants/signForms';
import useAsyncFunc from '../hooks/useAsyncFunc';

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [signForm, setSignForm] = useState(SIGN_FORMS.authentication);

	useEffect(() => {
		checkAuth();
	}, []);

	const signUp = useAsyncFunc(async ({ email, password }) => {
		return await createUserWithEmailAndPassword(DataBase.auth, email, password).then(
			(userCredential) => {
				setUser(userCredential.user);
			},
		);
	});

	const signIn = useAsyncFunc(async ({ email, password }) => {
		return await signInWithEmailAndPassword(DataBase.auth, email, password).then(
			(userCredential) => {
				setUser(userCredential.user);
			},
		);
	});

	const signOut = useAsyncFunc(async () => {
		return await DataBase.auth.signOut().then((res) => setUser(null));
	});

	const checkAuth = useAsyncFunc(async () => {
		return onAuthStateChanged(DataBase.auth, (user) => {
			if (user) {
				setUser(user);
			}
		});
	});

	return (
		<AuthContext.Provider
			value={{
				user,
				signUp,
				signIn,
				signOut,
				signForm,
				setSignForm,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
