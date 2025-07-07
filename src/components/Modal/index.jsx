import { CSSTransition } from 'react-transition-group';
import { ModalContext } from '../../context/modal.context';
import styles from './index.module.css';
import './transition.css';
import { useRef } from 'react';

const Modal = ({ isOpen, handleCloseModal, title, children }) => {
	const nodeRef = useRef();
	return (
		<CSSTransition
			in={isOpen}
			nodeRef={nodeRef}
			timeout={500}
			classNames="modal"
			unmountOnExit
		>
			<ModalContext.Provider value={{ handleCloseModal }}>
				<div className={styles.modal} ref={nodeRef}>
					<div className={styles.overlay} onClick={handleCloseModal}></div>
					<div className={styles.modalWindow}>
						<div className={styles.modalWindowWrapper}>
							<h3 className={styles.title}>{title}</h3>
							{children}
						</div>
					</div>
				</div>
			</ModalContext.Provider>
		</CSSTransition>
	);
};

export default Modal;
