import {isUndefined} from "lodash";

/**
 * Класс простого репозитория
 */
class SimpleRepository<K, V> implements IRepository<K, V> {
    protected repository: Map<K, V>;
    protected newValues: Map<K, V> | undefined;

    constructor() {
        this.init();
    }

    private init(): void {
        this.repository = new Map<K, V>();
    }

    /**
     * Функция присваивает значения в объект Map()
     * @param key
     * @param value
     */
    set(key: K, value: V): IRepository<K, V> {
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
    get(key: K): V | undefined;
    get(key: undefined): Map<K, V>;
    get(key: K | undefined): V | Map<K, V> | undefined {
        let currentRepository: Map<K, V>;
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
    rollback(): void {
        this.newValues = undefined;
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
