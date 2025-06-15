export const convertToUrlSearchParams = (params: {
  [key: string]: string | string[] | undefined;
}) => {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => urlParams.append(key, v));
    } else if (value !== undefined) {
      urlParams.set(key, value);
    }
  });
  return urlParams;
};
