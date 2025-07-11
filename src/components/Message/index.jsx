import { BUTTON_COLORS, BUTTON_VIEW } from '../../constants/button';
import Modal from '../Modal/index';
import styles from './index.module.css';
import Button from '../Button';
import './transition.css';

const Message = ({ title = '', message = '', isOpen, handleCloseModal, logo }) => {
	return (
		<Modal isOpen={isOpen} handleCloseModal={handleCloseModal} withoutFooter={true}>
			<div className={styles.messageWrapper}>
				<div className={styles.messageHeader}>
					<div className={styles.title}>{title}</div>
					{logo}
				</div>
				<div className={styles.messageBody}>
					<div className={styles.message}>{message}</div>
				</div>
				<div className={styles.messageActions}>
					<Button
						color={BUTTON_COLORS.purple}
						view={BUTTON_VIEW.outline}
						onClick={handleCloseModal}
						className={styles.autoCloseBtn}
					>
						Close
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default Message;
