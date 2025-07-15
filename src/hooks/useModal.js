import { useCallback, useState } from 'react';

const useModal = (init = false) => {
	const [isOpen, setIsOpen] = useState(init);
	const handleOpenModal = useCallback((callback = () => {}, ...args) => {
		if (typeof callback === 'function') callback(...args);
		setIsOpen(true);
	}, []);

	const handleCloseModal = useCallback((callback = () => {}, ...args) => {
		if (typeof callback === 'function') callback(...args);
		setIsOpen(false);
	}, []);

	return [isOpen, handleOpenModal, handleCloseModal];
};

export default useModal;
