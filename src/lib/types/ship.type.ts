import { PositionT } from './position.type';

export enum ShipSizeEnum {
  S = 'small',
  M = 'medium',
  L = 'large',
  XL = 'huge',
}

export type ShipT = {
  direction: boolean;
  length: number;
  position: PositionT;
  type: ShipSizeEnum;
};
