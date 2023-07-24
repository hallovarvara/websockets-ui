export const stringify = (response: any) =>
  JSON.stringify(
    Array.isArray(response) || !response.data
      ? response
      : { ...response, data: JSON.stringify(response.data) },
  );
