import {isUndefined} from "lodash";

/**
 * Класс простого репозитория
 */
class SimpleRepository<K extends keyof V, V> implements IRepository<K, V> {
    protected repository: Map<K, V[K]>;
    protected newValues: Map<K, V[K]> | undefined;

    constructor(entries: [K, V[K]][]) {
        this.init(entries);
    }

    private init(entries: [K, V[K]][]): void {
        this.repository = new Map<K, V[K]>(entries);
    }

    /**
     * Функция присваивает значения в объект Map()
     * @param key
     * @param value
     */
    set(key: K, value: V[K]): IRepository<K, V> {
        if (isUndefined(this.newValues)) {
            this.newValues = new Map(this.repository);
        }
        this.newValues.set(key, value);
        return this;
    }

    /**
     * В зависимости от переданных параметров возвращает значения по ключу или весь объект Map() целиком.
     * Если репозиторий в процессе изменения, то будут возвращаться новые значения
     * @param key
     */
    get(key: K): V[K] | undefined;
    get(): Map<K, V[K]>;
    get(key?: K | undefined): V[K] | Map<K, V[K]> | undefined {
        let currentRepository: Map<K, V[K]>;
        if (!isUndefined(this.newValues)) {
            currentRepository = this.newValues;
        } else {
            currentRepository = this.repository;
        }
        if (isUndefined(key)) {
            return currentRepository;
        } else {
            return currentRepository.get(key);
        }
    }

    /**
     * откатывает не принятые изменения в репозитории
     */
    rollback(): SimpleRepository<K, V> {
        this.newValues = undefined;
        return this;
    }

    /**
     * принимает последние изменения в репозитории
     */
    acceptValues(): SimpleRepository<K, V> {
        if (!isUndefined(this.newValues)) {
            this.repository = new Map(this.newValues);
        }
        return this;
    }
}

export default SimpleRepository;
