import { ModalContext } from '../../context/modal.context';
import styles from './index.module.css';

const Modal = ({ isOpen, handleCloseModal, title, children }) => {
	return isOpen ? (
		<ModalContext.Provider value={{ handleCloseModal }}>
			<div className={styles.overlay} onClick={handleCloseModal}></div>
			<div className={styles.modal}>
				<div className={styles.modalWrapper}>
					<h3 className={styles.title}>{title}</h3>
					{children}
				</div>
			</div>
		</ModalContext.Provider>
	) : (
		<></>
	);
};

export default Modal;
