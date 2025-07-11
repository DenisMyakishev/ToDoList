import Message from '../Message';
import LogoError from '../../assets/LogoError/index';

const ErrorFallback = ({ isOpen, handleCloseModal, error, afterClose }) => {
	return (
		<Message
			title="Error"
			message={error.message}
			isOpen={isOpen}
			handleCloseModal={handleCloseModal}
			logo={<LogoError />}
			afterAnimation={afterClose}
		></Message>
	);
};

export default ErrorFallback;
