import { useContext } from 'react';
import { LoaderContext } from '../context/loader.context';
import { ErrorContext } from '../context/error.context';

const useAsyncFunc = (callback, condition = true) => {
	const { setIsLoading } = useContext(LoaderContext);
	const { setError } = useContext(ErrorContext);
	const asyncFunc = async (prop) => {
		try {
			setIsLoading(true);
			if (condition) {
				return await callback(prop);
			}
		} catch (error) {
			setError(error);
			throw new Error(error);
		} finally {
			setIsLoading(false);
		}
	};
	return asyncFunc;
};

export default useAsyncFunc;
