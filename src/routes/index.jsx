import Footer from '../components/Footer';
import Header from '../components/Header';
import ToDo from '../pages/ToDo';
import { AuthContextProvider } from '../context/auth.context.jsx';
import { LoaderContextProvider } from '../context/loader.context.jsx';

export const AppRoutes = () => {
	return (
		<>
			<AuthContextProvider>
				<LoaderContextProvider>
					<Header />
					<ToDo />
					<Footer />
				</LoaderContextProvider>
			</AuthContextProvider>
		</>
	);
};
