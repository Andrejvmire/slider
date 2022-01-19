interface IRepository<K extends keyof V, V> {
    set(key: K, value: V[K]): IRepository<K, V>;

    get(): Map<K, V[K]>;

    get(key: K): V[K] | undefined;

    rollback(): IRepository<K, V>;

    acceptValues(): IRepository<K, V>;
}