import validator from 'validator';

export const isUrl = (string: string): boolean => {
  return validator.isURL(string);
};
