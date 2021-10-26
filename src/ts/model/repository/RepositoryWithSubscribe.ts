import SimpleRepository from "./SimpleRepository";
import {isUndefined} from "lodash";

class RepositoryWithSubscribe<K extends keyof TModelOptions, V extends number> implements IRepository<K, V> {
    private publishers: IPublisher;
    private repository: SimpleRepository<K, V>

    constructor(publisher: IPublisher) {
        this.init(publisher);
    }

    private init(publisher: IPublisher): void {
        this.repository = new SimpleRepository<K, V>();
        this.publishers = publisher;
    }

    set(key: K, value: V): IRepository<K, V> {
        this.repository.set(key, value);
        return this;
    }

    get(key: K): V | undefined;
    get(key: undefined): Map<K, V>;
    get(key: K | undefined): V | Map<K, V> | undefined {
        if (isUndefined(key)) {
            return this.repository.get(key);
        } else {
            return this.repository.get(key);
        }
    }

    rollback(): void {
        this.repository.rollback();
        this.publishers.notify("error");
        this.publishers.notify("root");
    }

    acceptValues(): IRepository<K, V> {
        this.repository.acceptValues();
        this.publishers.notify("apply");
        this.publishers.notify("root");
        return this;
    }
}

export default RepositoryWithSubscribe;