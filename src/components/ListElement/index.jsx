import styles from './index.module.css';
import Button from '../Button';
import Modal from '../Modal';
import ChangeTaskForm from '../ChangeTaskForm';
import { useContext, useState } from 'react';
import { ToDoContext } from '../../context/todo.context';
import { BUTTON_COLORS, BUTTON_VIEW } from '../../constants/button';

const ListElement = ({ element }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [mutableRecord, setmMutableRecord] = useState('');
	const { setTasks, removeTask } = useContext(ToDoContext);

	const handleOpemModal = (oldData) => {
		setmMutableRecord(oldData);
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
		setmMutableRecord('');
	};

	const handleRemoveElement = async (removeId) => {
		setTasks((prev) => prev.filter((t) => t.id !== removeId));
		await removeTask(removeId);
	};

	const toggleSelectElement = (e, element) => {
		e.stopPropagation();
		setTasks((prev) =>
			prev.map((p) => {
				if (p.id === element.id) {
					if (p.checked === true) {
						return { ...p, checked: false };
					} else {
						return { ...p, checked: true };
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
							onClick={() => handleOpemModal(element)}
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
			{
				<Modal isOpen={isOpen} handleCloseModal={handleCloseModal} title="Change">
					<ChangeTaskForm oldData={mutableRecord} />
				</Modal>
			}
		</>
	);
};

export default ListElement;
