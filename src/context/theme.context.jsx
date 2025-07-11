import { createContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const ThemeContext = createContext('dark');

export const ThemeContextProvider = ({ children }) => {
	const [theme, setTheme] = useLocalStorage('theme', 'dark');

	useEffect(() => {
		if (theme === 'dark') document.body.classList.add('light');
		else document.body.classList.remove('light');
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
