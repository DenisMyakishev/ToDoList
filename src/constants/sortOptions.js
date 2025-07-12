const SORT_METHODS = {
	strings: (arr, arg) =>
		arr.sort(function (a, b) {
			let first = a[arg];
			let second = b[arg];
			return first.localeCompare(second, 'en-US', {
				sensitivity: 'case',
				caseFirst: 'upper',
				numeric: true,
			});
		}),
	dates: (arr, arg) =>
		arr
			.sort(function (a, b) {
				let first = a[arg];
				let second = b[arg];
				return first - second;
			})
			.reverse(),
};

export const SORT_OPTIONS = {
	title: {
		value: 'title',
		text: 'Alphabet',
		sortMethod: SORT_METHODS.strings,
	},
	creationDate: {
		value: 'creationDate',
		text: 'Creation date',
		sortMethod: SORT_METHODS.dates,
	},
};
