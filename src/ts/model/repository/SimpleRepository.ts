import {isUndefined} from "lodash";
import {singleton} from "tsyringe";

/**
 * Класс простого репозитория
 */
@singleton()
class SimpleRepository<V> implements IRepository<V> {
    protected repository: Map<keyof V, V[keyof V]>;
    protected newValues: Map<keyof V, V[keyof V]> | undefined;

    constructor() {
        this.repository = new Map<keyof V, V[keyof V]>();
    }

    /**
     * Функция присваивает значения в объект Map()
     * @param key
     * @param value
     */
    set(key: keyof V, value: V[keyof V]): IRepository<V> {
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
    get(key: keyof V): V[keyof V] | undefined;
    get(): Map<keyof V, V[keyof V]>;
    get(key?: keyof V | undefined): V[keyof V] | Map<keyof V, V[keyof V]> | undefined {
        let currentRepository: Map<keyof V, V[keyof V]>;
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
    rollback(): SimpleRepository<V> {
        this.newValues = undefined;
        return this;
    }

    /**
     * принимает последние изменения в репозитории
     */
    acceptValues(): SimpleRepository<V> {
        if (!isUndefined(this.newValues)) {
            this.repository = new Map(this.newValues);
        }
        return this.rollback();
    }
}

export default SimpleRepository;
