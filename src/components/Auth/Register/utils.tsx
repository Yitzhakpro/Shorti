import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateUsername,
} from '../../../utils';
import type { RegisterValidationErrors } from './types';

export const validateRegisterForm = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): Record<string, never> | RegisterValidationErrors => {
  let isValid = true;
  const validationObject: RegisterValidationErrors = {
    username: [],
    email: [],
    password: [],
    confirmPassword: [],
  };

  const usernameValidations = validateUsername(username);
  if (usernameValidations.length > 0) {
    isValid = false;
    validationObject.username = usernameValidations;
  }

  const emailValidations = validateEmail(email);
  if (emailValidations.length > 0) {
    isValid = false;
    validationObject.email = emailValidations;
  }

  const passwordValidations = validatePassword(password);
  if (passwordValidations.length > 0) {
    isValid = false;
    validationObject.password = passwordValidations;
  }

  const confirmPasswordValidations = validateConfirmPassword(password, confirmPassword);
  if (confirmPasswordValidations.length > 0) {
    isValid = false;
    validationObject.confirmPassword = confirmPasswordValidations;
  }

  if (!isValid) {
    return validationObject;
  }

  return {};
};
