import { randomUUID } from 'node:crypto';
import { PlayerT } from '@/lib/types/player.type';
import { FIELD_SHIPS_NUMBER } from '@/lib/constants';

export const getNewPlayer = ({
  fieldShips = [],
  index = randomUUID(),
  name = '',
}: {
  fieldShips?: PlayerT['fieldShips'];
  index?: PlayerT['index'];
  name: PlayerT['name'];
}): PlayerT => ({
  name,
  index,
  roomId: '',
  idGame: '',
  ships: [],
  startPosition: '',
  fieldShips,
  isSingleGame: false,
  botInfo: {
    name: '',
    index: '',
    idGame: '',
  },
  shipsAlive: FIELD_SHIPS_NUMBER,
});
