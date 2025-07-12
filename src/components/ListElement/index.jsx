import styles from './index.module.css';
import Button from '../Button';
import Modal from '../Modal';
import ChangeTaskForm from '../ChangeTaskForm';
import { memo, useContext, useState } from 'react';
import { ToDoContext } from '../../context/todo.context';
import { BUTTON_COLORS, BUTTON_VIEW } from '../../constants/button';
import useModal from '../../hooks/useModal';

const ListElement = ({ element }) => {
	const [isOpen, handleOpemModal, handleCloseModal] = useModal(false);
	const [mutableRecord, setMutableRecord] = useState('');
	const { setTasks, removeTask } = useContext(ToDoContext);

	const handleRemoveElement = async (removeId) => {
		await removeTask(removeId).then(() => {
			setTasks((prev) => prev.filter((t) => t.id !== removeId));
		});
	};

	const toggleSelectElement = (e, element) => {
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
	};

	return (
		<>
			<div
				className={styles.listElement}
				ref={element.nodeRef}
				onClick={(e) => toggleSelectElement(e, element)}
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
							onClick={() =>
								handleOpemModal((element) => {
									setMutableRecord(element);
								}, element)
							}
						>
							Change
						</Button>
						<Button
							color={BUTTON_COLORS.red}
							view={BUTTON_VIEW.outline}
							onClick={() => handleRemoveElement(element.id)}
						>
							Delete
						</Button>
					</div>
				</div>
			</div>
			<Modal
				title="Change"
				isOpen={isOpen}
				handleCloseModal={() =>
					handleCloseModal(() => {
						setMutableRecord('');
					})
				}
			>
				<ChangeTaskForm oldData={mutableRecord} />
			</Modal>
		</>
	);
};

export default memo(ListElement);
