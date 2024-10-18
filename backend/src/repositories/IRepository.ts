export interface IRepository<T> {
  findUnique(where: Partial<T>): Promise<T | null>;
  findMany(where?: Partial<T>): Promise<T[]>;
  create(data: T): Promise<T>;
  update(where: Partial<T>, data: Partial<T>): Promise<T | null>;
  delete(where: Partial<T>): Promise<T | null>;
}
