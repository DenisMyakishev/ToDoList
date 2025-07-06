import styles from './index.module.css';

const Button = ({ children, handleClick, ...props }) => {
	const classes = [styles.branded];
	for (let key in props) {
		classes.push(styles[`${props[key]}`]);
	}
	return (
		<button onClick={handleClick} className={classes.join(' ')}>
			{children}
		</button>
	);
};

export default Button;
