import LogoTodo from '../../assets/LogoTodo';
import Button from '../Button';
import styles from './index.module.css';
import Modal from '../Modal';
import { useContext } from 'react';
import AuthForm from '../AuthForm';
import { AuthContext } from '../../context/auth.context';
import RegForm from '../RegForm';
import { SIGN_FORMS } from '../../constants/signForms';
import { BUTTON_COLORS, BUTTON_VIEW } from '../../constants/button';
import useModal from '../../hooks/useModal';

const Header = () => {
	const [isOpen, handleOpenModal, handleCloseModal] = useModal(false);
	const { user, signOut, signForm, setSignForm } = useContext(AuthContext);

	return (
		<header className={styles.header}>
			<div className={`container ${styles.headerContainer}`}>
				<LogoTodo />
				<nav>
					<Button view={BUTTON_VIEW.outline}>ToDo List</Button>
				</nav>
				{user === null ? (
					<Button color={BUTTON_COLORS.orange} onClick={handleOpenModal}>
						Sign In
					</Button>
				) : (
					<Button
						color={BUTTON_COLORS.orange}
						view={BUTTON_VIEW.outline}
						onClick={signOut}
					>
						Sign Out
					</Button>
				)}

				<Modal
					isOpen={isOpen}
					handleCloseModal={handleCloseModal}
					title={signForm === SIGN_FORMS.authentication ? 'Sign In' : 'Sign Up'}
					afterAnimation={() => {
						setSignForm(SIGN_FORMS.authentication);
					}}
				>
					{signForm === SIGN_FORMS.authentication ? <AuthForm /> : <RegForm />}
				</Modal>
			</div>
		</header>
	);
};

export default Header;
