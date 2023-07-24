import { RequestUserRegisterT } from '../types/data.type';

const PASS_NAME_MINIMAL_CHARS = 5;

const checkPropertyValid = (property?: unknown) =>
  property &&
  typeof property === 'string' &&
  property.length >= PASS_NAME_MINIMAL_CHARS;

export const isUserDataValid = (
  data: any,
): data is RequestUserRegisterT['data'] =>
  data &&
  typeof data === 'object' &&
  checkPropertyValid(data.name) &&
  checkPropertyValid(data.password);
