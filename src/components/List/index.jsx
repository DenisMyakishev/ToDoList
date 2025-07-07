import { useState } from 'react';
import Button from '../Button';
import styles from './index.module.css';
import './transition.css';
import Modal from '../Modal';
import ChangeTaskForm from '../ChangeTaskForm';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const List = ({ elements, handleRemoveElement, handleChangeElement }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [changeTask, setChangeTask] = useState('');

	const handleOpemModal = (oldData) => {
		setChangeTask(oldData);
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
		setChangeTask('');
	};

	return (
		<div className={styles.list}>
			<div className={styles.listWrapper}>
				<TransitionGroup component={null}>
					{elements.length > 0 ? (
						elements.map((element) => (
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
						))
					) : (
						<h4 className={styles.message}>List is empty</h4>
					)}
				</TransitionGroup>
			</div>
			{
				<Modal isOpen={isOpen} handleCloseModal={handleCloseModal} title="Change">
					<ChangeTaskForm
						oldData={changeTask}
						setFunction={handleChangeElement}
					/>
				</Modal>
			}
		</div>
	);
};

export default List;
