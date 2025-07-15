import { memo, useContext } from 'react';
import LogoError from '../../assets/LogoError';
import Message from '../Message';
import { ErrorContext } from '../../context/error.context';

const ErrorMessageModal = ({ isOpen, handleCloseModal, afterAnimation }) => {
	const { processedError } = useContext(ErrorContext);
	return (
		<Message
			title="Error"
			message={processedError.message}
			isOpen={isOpen}
			handleCloseModal={handleCloseModal}
			logo={<LogoError />}
			afterAnimation={afterAnimation}
		></Message>
	);
};

export default memo(ErrorMessageModal);
