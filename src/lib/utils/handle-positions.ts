import { getAttackResponse } from '@/lib/responses/get-attack-response';
import { stringify } from '@/lib/utils/stringify';
import { CellStatusEnum } from '@/lib/types/cell.type';
import { AttackT } from '@/lib/types/attack.type';
import { WebSocketClientT } from '@/lib/types/websocket-client.type';
import { DataTypeEnum } from '@/lib/types/data.type';

export const handlePositions = ({
  attack,
  client,
  type,
}: {
  attack: AttackT;
  client: WebSocketClientT;
  type: DataTypeEnum.Attack | DataTypeEnum.AttackRandom;
}) => {
  const { aroundPositions, killedPositions, currentPlayer } = attack;

  killedPositions.forEach((position) => {
    client.send(
      stringify(
        getAttackResponse({
          index: currentPlayer,
          position,
          status: CellStatusEnum.Killed,
          type,
        }),
      ),
    );
  });

  aroundPositions.forEach((position) => {
    client.send(
      stringify(
        getAttackResponse({
          index: currentPlayer,
          status: CellStatusEnum.Miss,
          position,
          type,
        }),
      ),
    );
  });
};
