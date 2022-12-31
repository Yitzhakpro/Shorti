export const parseAxiosError = (
  error: any,
  errorCodesTranslation: Record<string, string>
): never => {
  if (error.response) {
    const { message, metadata } = error.response.data;

    throw {
      message: errorCodesTranslation[message] ?? 'Internal Error, Contact support',
      metadata,
    };
  } else if (error.request) {
    throw { message: 'No internet / No response' };
  } else {
    throw { message: 'Error, contact support' };
  }
};
