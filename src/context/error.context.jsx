import { createContext, useEffect, useState } from 'react';
import ErrorMessageModal from '../components/ErrorMessageModal';

export const ErrorContext = createContext([false, '']);

const ErrorContextProvider = ({ children }) => {
	const [isErrorFallbackOpen, setIsErrorFallbackOpen] = useState(false);
	const [error, setError] = useState('');
	const [processedError, setProcessedError] = useState('');

	const processError = (error) => {
		switch (error.name) {
			case 'FirebaseError':
				switch (error.code) {
					case 'invalid-argument': {
						setProcessedError({ ...error, message: 'Data base error' });
						break;
					}
					case 'not-found': {
						setProcessedError({
							...error,
							message: 'The record was not found',
						});
						break;
					}
					case 'auth/invalid-credential': {
						setProcessedError({
							...error,
							message: 'The data is incorrect',
						});
						break;
					}
					case 'auth/email-already-in-use': {
						setProcessedError({
							...error,
							message:
								'The user with this email has already been registered',
						});
						break;
					}
				}
				break;
			case 'ReferenceError': {
				setProcessedError({ ...error, message: 'Programm code error' });
			}
			default:
				setProcessedError({ ...error, message: "Something's wrong." });
				break;
		}
	};

	useEffect(() => {
		if (error !== '') {
			processError(error);
			setIsErrorFallbackOpen(true);
		}
	}, [error]);

	return (
		<ErrorContext.Provider value={{ error, setError, processedError }}>
			{children}
			<ErrorMessageModal
				isOpen={isErrorFallbackOpen}
				handleCloseModal={() => setIsErrorFallbackOpen(false)}
				afterAnimation={() => setError('')}
			/>
		</ErrorContext.Provider>
	);
};

export default ErrorContextProvider;
