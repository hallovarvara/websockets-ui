import { ShipT } from '@/lib/types/ship.type';
import { getNewFieldEmpty } from '@/lib/utils/get-new-field-empty';
import { getNewCell } from '@/lib/utils/get-new-cell';

export const getNewField = (
  ships: ShipT[],
): ReturnType<typeof getNewFieldEmpty> => {
  const field = getNewFieldEmpty();

  ships.forEach((ship) => {
    const {
      position: { x, y },
      length,
      direction,
    } = ship;

    const cell = getNewCell(ship);

    if (field[y]?.[x] === 0) {
      let index = 0;
      const missAround = cell.missAroundPosition;

      const isSquare = direction === false || length === 1;

      for (let row = -1; row <= (isSquare ? 1 : length); row++) {
        for (let column = -1; column <= (isSquare ? length : 1); column++) {
          missAround.push({ x: x + column, y: y + row });
        }
      }

      while (index < length) {
        field[isSquare ? y : y + index]![isSquare ? x + index : x] = cell;
        index++;
      }
    }
  });

  return field;
};
