export const findErrors = (resData, errorMessage) => {
  if (resData.errors) throw new Error(errorMessage);
};

export const findValidationErrors = resData => {
  if (resData.errors && resData.errors[0].status === 422)
    throw new Error("validation failed");
};
