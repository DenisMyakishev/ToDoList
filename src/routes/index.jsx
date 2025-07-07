import Footer from '../components/Footer';
import Header from '../components/Header';
import ToDo from '../pages/ToDo';
import '../API/dataBase.js';
import { AuthContextProvider } from '../context/auth.context.jsx';

export const AppRoutes = () => {
	return (
		<>
			<AuthContextProvider>
				<Header />
				<ToDo />
				<Footer />
			</AuthContextProvider>
		</>
	);
};
