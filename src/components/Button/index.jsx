import styles from './index.module.css';

const Button = ({ children, onClick, type = 'button', className = '', ...props }) => {
	const classes = [className, styles.branded];
	const viewClasses = ['view', 'color'];
	for (let key in props) {
		if (viewClasses.includes(key)) {
			classes.push(styles[`${props[key]}`]);
		}
	}

	const handleClick = (e) => {
		e.stopPropagation();
		onClick(e);
	};

	return (
		<button type={type} onClick={handleClick} className={classes.join(' ')}>
			{children}
		</button>
	);
};

export default Button;
