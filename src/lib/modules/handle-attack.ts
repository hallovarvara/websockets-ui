import { findGame } from '@/lib/utils/find-game';
import { getErrorResponse } from '@/lib/responses/get-error-response';
import { getAttackResponse } from '@/lib/responses/get-attack-response';
import { getRandomShipIndex } from '@/lib/utils/get-random-ship-index';
import { stringify } from '@/lib/utils/stringify';
import { ERROR_MESSAGE_WAIT_TURN } from '@/lib/constants';
import { DataTypeEnum, ResponseAttackT } from '@/lib/types/data.type';
import { CellStatusEnum, CellT } from '@/lib/types/cell.type';
import { GameStageEnum } from '@/lib/types/game.type';

export const handleAttack = ({
  indexPlayer,
  gameId,
  x = getRandomShipIndex(),
  y = getRandomShipIndex(),
  type = DataTypeEnum.Attack,
}: ResponseAttackT['data'] & {
  type: DataTypeEnum.Attack | DataTypeEnum.AttackRandom;
}) => {
  const game = findGame(gameId);

  if (!game || game.currentPlayer !== indexPlayer) {
    return getErrorResponse({
      errorText: ERROR_MESSAGE_WAIT_TURN,
      type,
    });
  }

  const nextPlayer = game.gameUsers.find(
    (user) => user.index !== game.currentPlayer,
  );

  const user = game.gameUsers.find((user) => user.index !== indexPlayer);

  if (!user) {
    return getErrorResponse({ type });
  }

  const fieldShips = user.fieldShips;
  const position = { x, y };

  if (fieldShips[y]?.[x] === 0) {
    if (nextPlayer) {
      game.currentPlayer = nextPlayer.index;
    }

    return stringify(
      getAttackResponse({
        index: indexPlayer,
        status: CellStatusEnum.Miss,
        position,
        type,
      }),
    );
  }

  if (typeof fieldShips[y]?.[x] === 'object') {
    const cell = fieldShips[y]?.[x] as CellT;
    const shot = cell.shots.find((shot) => shot.x === x && shot.y === y);

    if (shot) {
      if (nextPlayer) {
        game.currentPlayer = nextPlayer.index;
      }

      return stringify(
        getAttackResponse({
          index: indexPlayer,
          position,
          status:
            cell.shots.length === cell.health
              ? CellStatusEnum.Killed
              : CellStatusEnum.Shot,
          type,
        }),
      );
    } else {
      const health = cell.shots.push(position);

      if (health < cell.health) {
        return getAttackResponse({
          index: indexPlayer,
          position,
          status: CellStatusEnum.Shot,
          type,
        });
      } else if (health === cell.health) {
        cell.status = CellStatusEnum.Killed;

        const killedPositions = cell.shots;
        const aroundPositions = cell.missAroundPosition.filter((miss) => {
          for (const shot of killedPositions) {
            if (miss.x === shot.x && miss.y === shot.y) {
              return false;
            }
          }

          return true;
        });

        user.shipsAlive--;

        game.stage = user.shipsAlive === 0 ? GameStageEnum.Finish : game.stage;

        return {
          currentPlayer: indexPlayer,
          killedPositions,
          aroundPositions,
        };
      }
    }
  }
};
