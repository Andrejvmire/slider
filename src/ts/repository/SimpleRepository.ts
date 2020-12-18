class SimpleRepository<T, K extends keyof T> implements IRepository<T, K> {
    protected _repository: Map<K, T>

    public constructor() {
        this._repository = new Map<K, T>();
    }

    public setValue(key: K, value: T) {
        this._repository.set(key, value);
    }

    public getValue(key: K): T | undefined {
        return this._repository.get(key);
    }
}