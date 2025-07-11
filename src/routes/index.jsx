import Footer from '../components/Footer';
import Header from '../components/Header';
import ToDo from '../pages/ToDo';
import { AuthContextProvider } from '../context/auth.context.jsx';
import { LoaderContextProvider } from '../context/loader.context.jsx';
import ErrorContextProvider from '../context/error.context.jsx';

export const AppRoutes = () => {
	return (
		<>
			<ErrorContextProvider>
				<LoaderContextProvider>
					<AuthContextProvider>
						<Header />
						<ToDo />
						<Footer />
					</AuthContextProvider>
				</LoaderContextProvider>
			</ErrorContextProvider>
		</>
	);
};
