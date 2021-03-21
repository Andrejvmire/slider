class SimpleRepository<K extends keyof V, V> {
    protected _repository: Map<K, V>;

    constructor() {
        this._repository = new Map<K, V>();
    }

    set(key: K, value: V) {
        this._repository.set(key, value);
    }

    get(key: K): V | undefined;
    get(key: undefined): Map<K,V>;
    get(key: any): any {
        if (typeof key === undefined) {
            return this._repository;
        }
        return this._repository.get(key);
    }
}
