import styles from './index.module.css';
import Button from '../Button';
import { memo, useCallback, useContext } from 'react';
import { ToDoContext } from '../../context/todo.context';
import { BUTTON_COLORS, BUTTON_VIEW } from '../../constants/button';

const ListElement = ({ element, setMutableTask, handleOpemModal }) => {
	const { setTasks, removeTask } = useContext(ToDoContext);
	const handleRemoveElement = async () => {
		await removeTask(element.id).then(() => {
			setTasks((prev) => prev.filter((t) => t.id !== element.id));
		});
	};

	const toggleSelectElement = useCallback((e) => {
		e.stopPropagation();
		setTasks((prev) =>
			prev.map((p) => {
				if (p.id === element.id) {
					if (p.selected === true) {
						return { ...p, selected: false };
					} else {
						return { ...p, selected: true };
					}
				}
				return p;
			}),
		);
		e.target.classList.toggle(`${styles.active}`);
	}, []);

	const handleOpenChangeModal = useCallback(() => {
		setMutableTask(element);
		handleOpemModal();
	}, []);

	return (
		<>
			<div
				className={styles.listElement}
				ref={element.nodeRef}
				onClick={toggleSelectElement}
			>
				<div className={styles.listElementWrapper}>
					<div className={styles.data}>
						<span className={styles.title}>{element.title}</span>
						<p className={styles.description}>{element.description}</p>
					</div>
					<div className={styles.actions}>
						<Button
							color={BUTTON_COLORS.orange}
							view={BUTTON_VIEW.outline}
							onClick={handleOpenChangeModal}
						>
							Change
						</Button>
						<Button
							color={BUTTON_COLORS.red}
							view={BUTTON_VIEW.outline}
							onClick={handleRemoveElement}
						>
							Delete
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default memo(ListElement);
