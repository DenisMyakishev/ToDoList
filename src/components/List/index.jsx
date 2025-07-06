import { useState } from 'react';
import Button from '../Button';
import styles from './index.module.css';
import Modal from '../Modal';
import ChangeTaskForm from '../ChangeTaskForm';

const List = ({ elements, handleRemoveElement, handleChangeElement }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [changId, setChangeId] = useState('');

	const handleOpemModal = (id) => {
		setChangeId(id);
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
		setChangeId('');
	};

	return (
		<div className={styles.list}>
			<div className={styles.listWrapper}>
				{elements.length > 0 ? (
					elements.map((element) => {
						return (
							<div className={styles.listElement} key={element.id}>
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
											onClick={() => handleOpemModal(element.id)}
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
						);
					})
				) : (
					<h4 className={styles.message}>List is empty</h4>
				)}
			</div>
			{isOpen ? (
				<Modal isOpen={isOpen} handleCloseModal={handleCloseModal} title="Change">
					<ChangeTaskForm id={changId} setFunction={handleChangeElement} />
				</Modal>
			) : (
				<></>
			)}
		</div>
	);
};

export default List;
