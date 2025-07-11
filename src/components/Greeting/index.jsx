import LogoGreeting from '../../assets/LogoGreeting';
import Message from '../Message';
import useModal from '../../hooks/useModal';

const Greeting = ({ isOpen, handleCloseModal }) => {
	const title = 'Welcome!';
	const message = 'Nice to see you. Have a nice day!';
	return (
		<Message
			isOpen={isOpen}
			handleCloseModal={handleCloseModal}
			title={title}
			message={message}
			logo={<LogoGreeting />}
		></Message>
	);
};

export default Greeting;
