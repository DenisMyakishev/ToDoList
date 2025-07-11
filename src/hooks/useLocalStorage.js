import { useEffect, useState } from 'react';

const useLocalStorage = (key, def) => {
	const [state, setState] = useState(() => {
		const localData = localStorage.getItem(key);
		return localData || def;
	});
	useEffect(() => {
		localStorage.setItem(key, state);
	}, [key, state]);
	return [state, setState];
};

export default useLocalStorage;
