import { createContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';
import DataBase from '../API/dataBase';
import { SIGN_FORMS } from '../constants/signForms';
import useAsyncFunc from '../hooks/useAsyncFunc';
import useModal from '../hooks/useModal';
import Message from '../components/Message';
import LogoGreeting from '../assets/LogoGreeting';

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [signForm, setSignForm] = useState(SIGN_FORMS.authentication);
	const [isOpen, handleOpenModal, handleCloseModal] = useModal(false);

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
				handleOpenModal();
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
			<Message
				isOpen={isOpen}
				handleCloseModal={handleCloseModal}
				title="Welcome!"
				message="Nice to see you. Have a nice day!"
				logo={<LogoGreeting />}
			></Message>
		</AuthContext.Provider>
	);
}
