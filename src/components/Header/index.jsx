import LogoTodo from '../../assets/LogoTodo';
import Button from '../Button';
import styles from './index.module.css';
import Modal from '../Modal';
import { useContext, useEffect, useState } from 'react';
import AuthForm from '../AuthForm';
import { AuthContext } from '../../context/auth.context';
import Loader from '../Loader';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { user, checkAuth, signOut } = useContext(AuthContext);

	useEffect(() => {
		checkAuth();
	}, []);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	return (
		<header className={styles.header}>
			<div className={`container ${styles.headerContainer}`}>
				<LogoTodo />
				<nav className="navigation">
					<Button view="outline">ToDo List</Button>
				</nav>
				{user === null ? (
					<Button color="orange" onClick={handleOpenModal}>
						Sign In
					</Button>
				) : (
					<Button color="orange" view="outline" onClick={signOut}>
						Sign Out
					</Button>
				)}

				<Modal
					isOpen={isOpen}
					handleCloseModal={handleCloseModal}
					title="Sign in"
				>
					<AuthForm />
				</Modal>
			</div>
		</header>
	);
};

export default Header;
