import Modal from '../Modal/index';
import styles from '../../main.module.css';
import localStyles from './index.module.css';
import './transition.css';

const Message = ({ title = '', message = '', isOpen, handleCloseModal, logo }) => {
	return (
		<Modal
			className={localStyles.message}
			isOpen={isOpen}
			handleCloseModal={handleCloseModal}
		>
			<div className={styles.modalForm}>
				<div className={localStyles.messageHeader}>
					<div className={localStyles.title}>{title}</div>
					{logo}
				</div>
				<div className={localStyles.messageBody}>
					<div className={localStyles.message}>{message}</div>
				</div>
			</div>
		</Modal>
	);
};

export default Message;
