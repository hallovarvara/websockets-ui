import { users } from '../db';
import { PlayerCredentialsT } from '../types/player.type';

export const isUserPasswordValid = ({ name, password }: PlayerCredentialsT) => {
  const user = users.find(({ name: userName }) => userName === name);
  return user ? user?.password === password : true;
};
