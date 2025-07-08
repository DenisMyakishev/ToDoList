import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { LoaderContext } from '../context/loader.context';

const useAuthAsyncFunc = (callback) => {
	const {setIsLoading} = useContext(LoaderContext)
	const [error, setError] = useState('');
	const { user } = useContext(AuthContext);
	const asyncFunc = async () => {
		try {
			setIsLoading(true);
			if (user?.uid) {
				await callback();
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	return [asyncFunc, error];
};

export default useAuthAsyncFunc;
