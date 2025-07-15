import { useContext, useEffect, useState } from 'react';
import { ToDoContext } from '../context/todo.context';
import { SORT_OPTIONS } from '../constants/sortOptions';

const useSearchSortQuery = () => {
	const { tasks, searchQuery, sortQuery } = useContext(ToDoContext);
	const [searchedElements, setSearchedElements] = useState();

	useEffect(() => {
		const searchResult = tasks.filter(
			(t) =>
				(t?.title.includes(searchQuery) ||
					t?.description.includes(searchQuery)) &&
				t,
		);
		const sortMethod = SORT_OPTIONS[sortQuery.value]?.sortMethod;
		const sortedAndSearchedResult = sortMethod(searchResult, sortQuery.value);
		setSearchedElements(
			sortQuery.isReversed
				? sortedAndSearchedResult.reverse()
				: sortedAndSearchedResult,
		);
	}, [tasks, searchQuery, sortQuery]);
	return [searchedElements];
};

export default useSearchSortQuery;
