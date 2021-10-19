import {isArray, isNil, isUndefined} from "lodash";

class Publisher implements IPublisher {
    private observer: Map<TPublisher, Set<ISubscriber>>;

    constructor() {
        this.init();
    }

    init() {
        this.observer = new Map<TPublisher, Set<ISubscriber>>();
    }

    attach(subscriber: ISubscriber, type: TPublisher): void {
        let subscribers = this.observer.get(type);
        if (isUndefined(subscribers)) {
            subscribers = new Set<ISubscriber>()
        }
        this.observer.set(type, subscribers.add(subscriber));
    }

    detach(subscriber: ISubscriber, type: TPublisher): void {
        let keys: IterableIterator<TPublisher>;
        if (isNil(type)) {
            keys = this.observer.keys();
        } else {
            keys = [type][Symbol.iterator]();
        }
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const result = keys.next();
            if (result.done === true) break;
            if (this.observer.has(result.value)) {
                this.observer.get(result.value)?.delete(subscriber);
            }
        }
    }

    notify(type: TPublisher): void;
    notify(type: TPublisher[]): void;
    notify(type: TPublisher | TPublisher[]): void {
        if (isArray(type)) {
            type.forEach(this.notify.bind(this));
        } else {
            this.observer
                .get(type)
                ?.forEach(
                    subscriber => subscriber.update(type)
                );
        }
    }

}

export default Publisher;