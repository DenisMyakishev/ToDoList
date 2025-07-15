import { memo, useCallback, useContext } from 'react';
import Button from '../Button';
import Input from '../Input';
import styles from './index.module.css';
import AddTaskForm from '../AddTaskForm';
import { ToDoContext } from '../../context/todo.context';
import { BUTTON_COLORS, BUTTON_VIEW } from '../../constants/button';
import useModal from '../../hooks/useModal';
import DropDownMenu from '../DropDownMenu';

const ToDoActions = () => {
	const { setSearchQuery, searchQuery, removeSelectedTasks, setTasks, tasks } =
		useContext(ToDoContext);
	const [isOpen, handleOpenModal, handleCloseModal] = useModal(false);

	const handleRemoveSelected = useCallback(async () => {
		await removeSelectedTasks(tasks).then(() => {
			setTasks((prev) => prev.filter((t) => !t.selected && t));
		});
	}, [tasks]);

	const handleChange = useCallback((e) => {
		setSearchQuery(e.target.value);
	}, []);

	return (
		<>
			<div className={styles.actions}>
				<Button
					color={BUTTON_COLORS.green}
					view={BUTTON_VIEW.outline}
					onClick={handleOpenModal}
				>
					Add
				</Button>
				<Button
					color={BUTTON_COLORS.red}
					view={BUTTON_VIEW.outline}
					onClick={handleRemoveSelected}
				>
					Remove selected
				</Button>
				<DropDownMenu />
				<Input
					name="query"
					placeholder="Search"
					value={searchQuery}
					clearByClick
					onChange={handleChange}
				/>
			</div>
			<AddTaskForm isOpen={isOpen} handleCloseModal={handleCloseModal} />
		</>
	);
};

export default memo(ToDoActions);
