import LogoTodo from '../../assets/LogoTodo';
import Button from '../Button';
import styles from './index.module.css';
import Modal from '../Modal';
import { useContext, useEffect, useRef } from 'react';
import AuthForm from '../AuthForm';
import { AuthContext } from '../../context/auth.context';
import RegForm from '../RegForm';
import { SIGN_FORMS } from '../../constants/signForms';
import { BUTTON_COLORS, BUTTON_VIEW } from '../../constants/button';
import useModal from '../../hooks/useModal';
import { ThemeContext } from '../../context/theme.context';

const Header = () => {
	const [isOpen, handleOpenModal, handleCloseModal] = useModal(false);
	const { user, signOut, signForm, setSignForm } = useContext(AuthContext);
	const { theme, setTheme } = useContext(ThemeContext);
	const pointRef = useRef(null);

	useEffect(() => {
		theme === 'dark' && pointRef.current.classList.add(`${styles.light}`);
	}, []);

	const changeTheme = (e) => {
		setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
		pointRef.current.classList.toggle(`${styles.light}`);
	};

	return (
		<header className={styles.header}>
			<div className={`container ${styles.headerContainer}`}>
				<div className={styles.headerStart}>
					<LogoTodo />
					<div className={styles.chengeTheme} onClick={changeTheme}>
						<div className={styles.changeThemeWrapper}>
							<div className={styles.point} ref={pointRef}></div>
						</div>
					</div>
				</div>

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
			<hr className={styles.separator} />
		</header>
	);
};

export default Header;
