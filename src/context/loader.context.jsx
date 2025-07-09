import { createContext, useState } from 'react';
import Loader from '../components/Loader';

export const LoaderContext = createContext();

export const LoaderContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<LoaderContext.Provider value={{ setIsLoading }}>
			{children}
			<Loader isLoading={isLoading} />
		</LoaderContext.Provider>
	);
};
