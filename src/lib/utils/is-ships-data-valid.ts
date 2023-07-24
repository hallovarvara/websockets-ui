export const isShipsDataValid = (data: any) =>
  data &&
  typeof data === 'object' &&
  typeof data.gameId === 'string' &&
  typeof data.indexPlayer === 'string' &&
  Array.isArray(data.ships);
