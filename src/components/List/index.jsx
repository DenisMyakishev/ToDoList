import styles from './index.module.css';
import './transition.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ListElement from '../ListElement';
import { memo, useCallback, useState } from 'react';
import useModal from '../../hooks/useModal';
import ChangeTaskForm from '../ChangeTaskForm';

const List = ({ elements = [] }) => {
	const [isOpen, handleOpemModal, handleCloseModal] = useModal(false);
	const [mutableTask, setMutableTask] = useState('');
	const setMutableTaskAction = useCallback((element) => {
		setMutableTask(element);
	}, []);

	return (
		<>
			<ChangeTaskForm
				isOpen={isOpen}
				handleCloseModal={handleCloseModal}
				oldData={mutableTask}
			/>
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
									<ListElement
										element={element}
										setMutableTask={setMutableTaskAction}
										handleOpemModal={handleOpemModal}
									/>
								</CSSTransition>
							))}
						</TransitionGroup>
					) : (
						<h4 className={styles.message}>List is empty</h4>
					)}
				</div>
			</div>
		</>
	);
};

export default memo(List);
