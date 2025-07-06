import LogoTodo from '../../assets/LogoTodo';
import Button from '../Button';
import styles from './index.module.css';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={`container ${styles.headerContainer}`}>
				<LogoTodo />
				<nav className="navigation">
					<Button view="outline">ToDo List</Button>
				</nav>
				<Button color="orange">Sign In</Button>
			</div>
		</header>
	);
};

export default Header;
