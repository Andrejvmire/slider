import SimpleRepository from "./SimpleRepository";
import {isUndefined} from "lodash";

class RepositoryWithSubscribe<V extends TModelOptions> implements IRepository<V> {
    private publishers: IPublisher;
    private repository: SimpleRepository<V>

    constructor(publisher: IPublisher, entries: [keyof V, V[keyof V]][] = []) {
        this.init(publisher, entries);
    }

    private init(publisher: IPublisher, entries: [keyof V, V[keyof V]][]): void {
        this.repository = new SimpleRepository<V>(entries);
        this.publishers = publisher;
    }

    /**
     * Присваивает значения в объект Map()
     * @param key ключ
     * @param value значение
     */
    set(key: keyof V, value: V[keyof V]): IRepository<V> {
        this.repository.set(key, value);
        this.publishers.notify("change");
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
        if (isUndefined(key)) {
            return this.repository.get();
        }
        return this.repository.get(key);
    }

    /**
     * отмена изменений
     */
    rollback(): RepositoryWithSubscribe<V> {
        this.repository.rollback();
        this.publishers.notify("error");
        return this;
    }

    /**
     * подтверждение изменений
     */
    acceptValues(): IRepository<V> {
        this.repository.acceptValues();
        this.publishers.notify("apply");
        return this;
    }
}

export default RepositoryWithSubscribe;