import { users } from '../db';

export const isUserExisting = (userName: string) =>
  users.some(({ name }) => userName === name);
