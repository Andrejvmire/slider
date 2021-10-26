interface IRepository<K, V> {
    set(key: K, value: V): IRepository<K, V>;

    get(key?: K | undefined): V | Map<K, V> | undefined;

    rollback(): void;

    acceptValues(): IRepository<K, V>;
}