import { CSSTransition } from 'react-transition-group';
import { ModalContext } from '../../context/modal.context';
import styles from './index.module.css';
import './transition.css';
import { useRef } from 'react';
import Button from '../Button/index';
import { BUTTON_COLORS, BUTTON_VIEW } from '../../constants/button';

const Modal = ({
	isOpen,
	handleCloseModal,
	title,
	children,
	afterAnimation = () => {},
	closeByCross = true,
	withoutFooter = false,
	...props
}) => {
	const nodeRef = useRef();
	return (
		<CSSTransition
			in={isOpen}
			nodeRef={nodeRef}
			timeout={500}
			classNames="modal"
			unmountOnExit
			onExited={afterAnimation}
		>
			<ModalContext.Provider value={{ handleCloseModal }}>
				<div className={`${styles.modal} ${props.className}`} ref={nodeRef}>
					<div
						className={styles.overlay}
						onClick={() => handleCloseModal()}
					></div>
					<div className={styles.modalWindow}>
						<div className={styles.modalWindowWrapper}>
							<h3 className={styles.title}>{title}</h3>
							{children}
							{!withoutFooter && (
								<div className={styles.modalFooter}>
									<Button
										color={BUTTON_COLORS.purple}
										view={BUTTON_VIEW.outline}
										className={styles.cancelBtn}
										onClick={handleCloseModal}
									>
										Cancel
									</Button>
								</div>
							)}
							{closeByCross && (
								<div
									className={styles.closeByCross}
									onClick={() => handleCloseModal()}
								>
									<div className={styles.crossWrapper}></div>
								</div>
							)}
						</div>
					</div>
				</div>
			</ModalContext.Provider>
		</CSSTransition>
	);
};

export default Modal;
