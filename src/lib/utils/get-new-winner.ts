import { PlayerT } from '@/lib/types/player.type';

export const getNewWinner = (name: PlayerT['name']) => ({ name, wins: 1 });
