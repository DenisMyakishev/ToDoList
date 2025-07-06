import styles from './index.module.css';

const List = (elements) => {
	return (
		<div className={styles.list}>
			<div className={styles.listWrapper}>
				{elements.length > 0 ? (
					<div className="element"></div>
				) : (
					<h4 className={styles.message}>List is empty</h4>
				)}
			</div>
		</div>
	);
};

export default List;
