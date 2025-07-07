import LogoTodo from '../../assets/LogoTodo';
import Button from '../Button';
import styles from './index.module.css';
import Modal from '../Modal';
import { useRef, useState } from 'react';
import AuthForm from '../AuthForm';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

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
				<Button color="orange" onClick={handleOpenModal}>
					Sign In
				</Button>
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
