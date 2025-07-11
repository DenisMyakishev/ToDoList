import Footer from '../components/Footer';
import Header from '../components/Header';
import ToDo from '../pages/ToDo';
import { AuthContextProvider } from '../context/auth.context.jsx';
import { LoaderContextProvider } from '../context/loader.context.jsx';
import ErrorContextProvider from '../context/error.context.jsx';
import { ThemeContextProvider } from '../context/theme.context.jsx';

export const AppRoutes = () => {
	return (
		<>
			<ErrorContextProvider>
				<LoaderContextProvider>
					<AuthContextProvider>
						<ThemeContextProvider>
							<Header />
							<ToDo />
							<Footer />
						</ThemeContextProvider>
					</AuthContextProvider>
				</LoaderContextProvider>
			</ErrorContextProvider>
		</>
	);
};
