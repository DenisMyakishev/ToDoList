import { useEffect, useState } from 'react';

const useValidation = (values, validations) => {
	const [errorMessages, setErrorMessages] = useState({});
	const [isValid, setIsValid] = useState(false);
	const [forcedFocus, setForcedFocus] = useState(false);

	useEffect(() => {
		setErrorMessages('');
		for (const value in values) {
			const currentValue = values[value];
			for (const validation in validations[value]) {
				switch (validation) {
					case 'isEmpty':
						if (!currentValue) {
							setErrorMessages((prev) => {
								return {
									...prev,
									[value]: "Input can't be empty",
								};
							});
						}
						break;
					case 'minLength':
						if (currentValue.length < validations[value][validation]) {
							setErrorMessages((prev) => {
								return {
									...prev,
									[value]: `The value cannot be shorter than ${validations[value][validation]} characters`,
								};
							});
						}
						break;
					case 'maxLength':
						if (currentValue.length > validations[value][validation]) {
							setErrorMessages((prev) => {
								return {
									...prev,
									[value]: `The value cannot be longer than ${validations[value][validation]} characters`,
								};
							});
						}
						break;
					case 'isMail':
						const reg = new RegExp(
							/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
						);
						if (!reg.test(currentValue)) {
							setErrorMessages((prev) => {
								return {
									...prev,
									[value]: `Email is incorrect!`,
								};
							});
						}
						break;
					case 'confirmPassword':
						if (
							currentValue !== validations[value][validation] ||
							currentValue === ''
						) {
							setErrorMessages((prev) => {
								return {
									...prev,
									[value]: `Passwords don't match!`,
								};
							});
						}
						break;
				}
			}
		}
	}, [values]);

	useEffect(() => {
		if (errorMessages === '') {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	});

	return [errorMessages, isValid, forcedFocus, setForcedFocus];
};

export default useValidation;
