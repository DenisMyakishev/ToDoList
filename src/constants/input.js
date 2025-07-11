export const INPUT_TYPE = {
	password: 'password',
	email: 'email',
};

export const INPUT_PATTERNS = {
	email: {
		name: 'email',
		label: 'Email',
		placeholder: 'Email',
	},
	password: {
		name: 'password',
		label: 'Password',
		placeholder: 'Password',
		guarded: true,
	},
	title: {
		name: 'title',
		label: 'Title',
		placeholder: 'Title',
	},
	description: {
		name: 'description',
		label: 'Description',
		placeholder: 'Description',
	},
	confirmPassword: {
		name: 'confirmPassword',
		label: 'Confirm password',
		placeholder: 'Confirm password',
		guarded: true,
	},
};
