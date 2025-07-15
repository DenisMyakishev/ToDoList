import LogoGreeting from '../../assets/LogoGreeting';
import Message from '../Message';

const Greeting = ({ isOpen, handleCloseModal }) => {
	return (
		<Message
			isOpen={isOpen}
			handleCloseModal={handleCloseModal}
			title="Welcome!"
			message="Nice to see you. Have a nice day!"
			logo={<LogoGreeting />}
		></Message>
	);
};

export default Greeting;
