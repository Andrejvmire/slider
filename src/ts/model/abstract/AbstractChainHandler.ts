import {isUndefined} from "lodash";

abstract class AbstractChainHandler<T> implements IChainHandler<T> {
    private nextHandler?: IChainHandler<T>;
    protected repository: IRepository<T>
    protected abstract field: Partial<keyof T>;
    protected abstract referenceField?: Partial<keyof T>;

    constructor(repository: IRepository<T>) {
        this.repository = repository;
    }

    public handle(request: Partial<T>): boolean {
        const checkValue = this.checkValue(request);
        if (checkValue) {
            this.setReference(request)
            this.execute(request);
        }
        if (!isUndefined(this.nextHandler)) {
            return this.nextHandler.handle(request);
        }
        return checkValue;
    }

    public setNext(handler: IChainHandler<T>): IChainHandler<T> {
        this.nextHandler = handler;
        return handler;
    }

    protected execute(request: Partial<T>): void {
        const value = this.getValue(request);
        if (!isUndefined(value)) {
            this.repository.set(this.field, value);
        }
    }

    private getValue(request: Partial<T>): T[keyof T] | undefined {
        return request[this.field];
    }

    private setReference(request: Partial<T>): void {
        if (isUndefined(request[this.field]) && !isUndefined(this.referenceField)) {
            request[this.field] = request[this.referenceField];
        }
    }

    protected abstract checkValue(request: Partial<T>): boolean;

}

export default AbstractChainHandler;