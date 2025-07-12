import { useState } from 'react';

const useModal = (init = false) => {
	const [isOpen, setIsOpen] = useState(init);
	const handleOpenModal = (callback = () => {}, ...args) => {
		if (typeof callback === 'function') callback(...args);
		setIsOpen(true);
	};

	const handleCloseModal = (callback = () => {}, ...args) => {
		if (typeof callback === 'function') callback(...args);
		setIsOpen(false);
	};

	return [isOpen, handleOpenModal, handleCloseModal];
};

export default useModal;
