import { ERROR_MESSAGE_DEFAULT } from '../constants';

export const getErrorResponse = <Type>({
  errorText = ERROR_MESSAGE_DEFAULT,
  type,
  id = 0,
}: {
  errorText?: string;
  type: Type;
  id?: number;
}) => ({
  type,
  data: { name: '', index: '', error: true, errorText },
  id,
});
