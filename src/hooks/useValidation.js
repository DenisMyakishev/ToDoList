import { useCallback, useEffect, useState } from 'react';

const useValidation = (values, validations) => {
	const [validationErrorMessages, setValidationErrorMessages] = useState({});
	const [isValid, setIsValid] = useState(false);
	const [forcedFocus, setForcedFocus] = useState(false);

	const setNewErrorMessage = useCallback((key, message) => {
		setValidationErrorMessages((prev) => {
			return {
				...prev,
				[key]: message,
			};
		});
	}, []);

	useEffect(() => {
		setValidationErrorMessages('');
		for (const value in values) {
			const currentValue = values[value];
			for (const validation in validations[value]) {
				switch (validation) {
					case 'isEmpty':
						if (!currentValue) {
							setNewErrorMessage(value, "Input can't be empty");
						}
						break;
					case 'minLength':
						if (currentValue.length < validations[value][validation]) {
							setNewErrorMessage(
								value,
								`The value cannot be shorter than ${validations[value][validation]} characters`,
							);
						}
						break;
					case 'maxLength':
						if (currentValue.length > validations[value][validation]) {
							setNewErrorMessage(
								value,
								`The value cannot be longer than ${validations[value][validation]} characters`,
							);
						}
						break;
					case 'isMail':
						const reg = new RegExp(
							/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
						);
						if (!reg.test(currentValue)) {
							setNewErrorMessage(value, `Email is incorrect!`);
						}
						break;
					case 'confirmPassword':
						if (
							currentValue !== validations[value][validation] ||
							currentValue === ''
						) {
							setNewErrorMessage(value, `Passwords don't match!`);
						}
						break;
				}
			}
		}
	}, [values]);

	useEffect(() => {
		if (validationErrorMessages === '') {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	}, [validationErrorMessages]);

	return [validationErrorMessages, isValid, forcedFocus, setForcedFocus];
};

export default useValidation;
