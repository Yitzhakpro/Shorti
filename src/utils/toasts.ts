import { toast, Id, TypeOptions } from 'react-toastify';

export const notifyLoading = (message: string): Id => {
  return toast.loading(message);
};

export const updateNotify = (
  id: Id,
  message: string,
  type: TypeOptions,
  isLoading = false
): void => {
  toast.update(id, { render: message, type, isLoading, closeButton: true, autoClose: 3000 });
};

export const notifySuccess = (message: string): Id => {
  return toast.success(message, { autoClose: 3000 });
};

export const notifyError = (message: string): Id => {
  return toast.error(message, { autoClose: 3000 });
};
