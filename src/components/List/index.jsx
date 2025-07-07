import { useState, useContext, useEffect } from 'react';
import Button from '../Button';
import styles from './index.module.css';
import './transition.css';
import Modal from '../Modal';
import ChangeTaskForm from '../ChangeTaskForm';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ToDoContext } from '../../context/todo.context';

const List = ({ elements = [] }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [changeTask, setChangeTask] = useState('');
	const { setTasks, removeTask } = useContext(ToDoContext);

	

	const handleOpemModal = (oldData) => {
		setChangeTask(oldData);
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
		setChangeTask('');
	};

	const handleRemoveElement = async (removeId) => {
		setTasks((prev) => prev.filter((t) => t.id !== removeId));
		await removeTask(removeId);
	};

	return (
		<div className={styles.list}>
			<div className={styles.listWrapper}>
				{elements.length > 0 ? (
					<TransitionGroup component={null}>
						{elements.map((element) => (
							<CSSTransition
								key={element.id}
								nodeRef={element.nodeRef}
								timeout={500}
								classNames="element"
							>
								<div className={styles.listElement} ref={element.nodeRef}>
									<div className={styles.listElementWrapper}>
										<div className={styles.data}>
											<span className={styles.title}>
												{element.title}
											</span>
											<p className={styles.description}>
												{element.description}
											</p>
										</div>
										<div className={styles.actions}>
											<Button
												color="orange"
												view="outline"
												onClick={() => handleOpemModal(element)}
											>
												Change
											</Button>
											<Button
												color="red"
												view="outline"
												onClick={() =>
													handleRemoveElement(element.id)
												}
											>
												Delete
											</Button>
										</div>
									</div>
								</div>
							</CSSTransition>
						))}
					</TransitionGroup>
				) : (
					<h4 className={styles.message}>List is empty</h4>
				)}
			</div>
			{
				<Modal isOpen={isOpen} handleCloseModal={handleCloseModal} title="Change">
					<ChangeTaskForm oldData={changeTask} />
				</Modal>
			}
		</div>
	);
};

export default List;
