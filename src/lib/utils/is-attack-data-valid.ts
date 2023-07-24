import {
  DataTypeEnum,
  ResponseAttackT,
  ResponseT,
} from '@/lib/types/data.type';

export const isAttackDataValid = ({
  response: { data },
  type,
}: {
  response: ResponseT;
  type: DataTypeEnum;
}) => {
  if (type !== DataTypeEnum.Attack && type !== DataTypeEnum.AttackRandom) {
    return false;
  }

  const { gameId, indexPlayer, x, y } = data as ResponseAttackT['data'];

  const isAttackRandom =
    data &&
    typeof data === 'object' &&
    typeof gameId === 'string' &&
    typeof indexPlayer === 'string';

  return type === DataTypeEnum.AttackRandom
    ? isAttackRandom
    : isAttackRandom && typeof x === 'number' && typeof y === 'number';
};
