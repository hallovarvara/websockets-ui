import { PlayerT } from './player.type';

export enum GameStageEnum {
  Finish = 'finish',
  Prepare = 'prepare',
  Ready = 'ready',
  Start = 'start',
}

export type GameT = {
  stage: GameStageEnum;
  idGame: string;
  currentPlayer: string;
  gameUsers: PlayerT[];
  gameWinner: string;
};
