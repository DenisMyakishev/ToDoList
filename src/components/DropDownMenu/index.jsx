import { memo, useCallback, useContext, useRef } from 'react';
import styles from './index.module.css';
import { ToDoContext } from '../../context/todo.context';
import Button from '../Button';
import { BUTTON_VIEW } from '../../constants/button';
import { SORT_OPTIONS } from '../../constants/sortOptions';

const DropDownMenu = () => {
	const { sortQuery, setSortQuery } = useContext(ToDoContext);
	const menuRef = useRef();

	const handeReverse = useCallback(() => {
		setSortQuery((prev) => {
			return { ...prev, isReversed: !prev.isReversed };
		});
		menuRef.current.classList.remove(`${styles.active}`);
	}, []);

	const handleChooseOption = useCallback((e) => {
		setSortQuery((prev) => {
			return { ...prev, value: e.target.getAttribute('value') };
		});
		menuRef.current.classList.remove(`${styles.active}`);
	}, []);

	const handleToggleMenu = useCallback(() => {
		menuRef.current.classList.toggle(`${styles.active}`);
	}, []);

	return (
		<div className={styles.selectWrapper}>
			<Button
				view={BUTTON_VIEW.outline}
				className={styles.dropDownBtn}
				onClick={handleToggleMenu}
			>
				Sorted by {SORT_OPTIONS[sortQuery.value].text.toLowerCase()}
			</Button>
			<div className={styles.dropDownMenu} ref={menuRef}>
				{Object.values(SORT_OPTIONS).map((option) => (
					<li
						key={option.value}
						className={styles.dropDownOption}
						value={option.value}
						onClick={handleChooseOption}
					>
						{option.text}
					</li>
				))}
				<li
					key="reverse"
					className={
						sortQuery.isReversed
							? `${styles.dropDownOption} ${styles.reversedOption}`
							: `${styles.dropDownOption}`
					}
					value="reverse"
					onClick={handeReverse}
				>
					Reverse
				</li>
			</div>
		</div>
	);
};

export default memo(DropDownMenu);
