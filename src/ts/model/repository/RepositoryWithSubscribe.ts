import SimpleRepository from "./SimpleRepository";
import {isUndefined} from "lodash";

class RepositoryWithSubscribe<K extends keyof TModelOptions, V extends number> implements IRepository<K, V> {
    private publishers: IPublisher;
    private repository: SimpleRepository<K, V>

    constructor(publisher: IPublisher, entries: [K, V][]) {
        this.init(publisher, entries);
    }

    private init(publisher: IPublisher, entries: [K, V][]): void {
        this.repository = new SimpleRepository<K, V>(entries);
        this.publishers = publisher;
    }

    /**
     * Присваивает значения в объект Map()
     * @param key ключ
     * @param value значение
     */
    set(key: K, value: V): IRepository<K, V> {
        this.repository.set(key, value);
        this.publishers.notify("change");
        return this;
    }

    /**
     * В зависимости от переданных параметров возвращает значения по ключу или весь объект Map() целиком.
     * Если репозиторий в процессе изменения, то будут возвращаться новые значения
     * @param key
     */
    get(key: K): V | undefined;
    get(): Map<K, V>;
    get(key?: K | undefined): V | Map<K, V> | undefined {
        if (isUndefined(key)) {
            return this.repository.get();
        }
        return this.repository.get(key);
    }

    /**
     * отмена изменений
     */
    rollback(): void {
        this.repository.rollback();
        this.publishers.notify("error");
    }

    /**
     * подтверждение изменений
     */
    acceptValues(): IRepository<K, V> {
        this.repository.acceptValues();
        this.publishers.notify("apply");
        return this;
    }
}

export default RepositoryWithSubscribe;