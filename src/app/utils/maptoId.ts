export function mapId<T extends { _id?: string }>(document: T): Omit<T, '_id'> & { id: string | undefined } {
  const { _id, ...rest } = document;
  return { ...rest, id: _id };
}
