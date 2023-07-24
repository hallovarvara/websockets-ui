import { isUserDataValid } from '@/lib/utils/is-user-data-valid';
import { parseResponseData } from '@/lib/utils/parse-response-data';
import { getErrorResponse } from '@/lib/responses/get-error-response';
import { isUserExisting } from '@/lib/utils/is-user-existing';
import { isUserPasswordValid } from '@/lib/utils/is-user-password-valid';
import { getNewPlayer } from '@/lib/utils/get-new-player';
import { DataTypeEnum, ResponseT } from '@/lib/types/data.type';
import { WebSocketClientT } from '@/lib/types/websocket-client.type';
import {
  ERROR_MESSAGE_INCORRECT_PASSWORD,
  ERROR_MESSAGE_INVALID_DATA,
  ERROR_MESSAGE_USER_EXISTS,
} from '@/lib/constants';

export const getRegisterUserResponse = ({
  response,
  wsClient,
}: {
  response: ResponseT;
  wsClient: WebSocketClientT;
}) => {
  const data = parseResponseData(response);

  if (!isUserDataValid(data)) {
    return getErrorResponse({
      errorText: ERROR_MESSAGE_INVALID_DATA,
      type: DataTypeEnum.UserRegister,
      id: 0,
    });
  }

  const { name } = data;

  if (isUserExisting(name)) {
    return getErrorResponse({
      errorText: ERROR_MESSAGE_USER_EXISTS,
      type: DataTypeEnum.UserRegister,
      id: 0,
    });
  }

  if (!isUserPasswordValid(data)) {
    return getErrorResponse({
      errorText: ERROR_MESSAGE_INCORRECT_PASSWORD,
      type: DataTypeEnum.UserRegister,
      id: 0,
    });
  }

  wsClient.playerInfo = getNewPlayer({ name });

  return {
    data: {
      name,
      index: wsClient.playerInfo.index,
      error: false,
      errorText: '',
    },
    id: 0,
    type: DataTypeEnum.UserRegister,
  };
};
