interface IRepository<T, K extends keyof T> {
    setValue(key: K, value: T): void;
    getValue(key:K): T | undefined;
}