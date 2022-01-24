interface IRepository<V> {
    set(key: keyof V, value: V[keyof V]): IRepository<V>;

    get(): Map<keyof V, V[keyof V]>;
    get(key: keyof V): V[keyof V] | undefined;

    rollback(): IRepository<V>;

    acceptValues(): IRepository<V>;
}