import validator from 'validator';

export const isUrl = (string: string): boolean => {
  return validator.isURL(string);
};

export const validateUsername = (string: string): string[] => {
  const validationErrors: string[] = [];

  if (string.length < 1 || string.length > 20) {
    validationErrors.push('Username should be between 1 and 20 characters');
  }

  return validationErrors;
};

export const validateEmail = (string: string): string[] => {
  const validationErrors: string[] = [];
  const isEmail = validator.isEmail(string);

  if (!isEmail) {
    validationErrors.push('Invalid Email Address');
  }

  return validationErrors;
};

export const validatePassword = (string: string): string[] => {
  const validationErrors: string[] = [];

  if (string.length < 8 || string.length > 16) {
    validationErrors.push('Password should be between 8 and 16 characters');
  }

  if (!/\d/.test(string)) {
    validationErrors.push('Password should contain at least 1 number');
  }

  if (!/[A-Z]/.test(string) && !/[a-z]/.test(string)) {
    validationErrors.push('Password should contain at least 1 lowercase and 1 uppercase letters');
  }

  return validationErrors;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string[] => {
  const validationErrors: string[] = [];

  if (password !== confirmPassword) {
    validationErrors.push('Confirm password should be equal password');
  }

  return validationErrors;
};
