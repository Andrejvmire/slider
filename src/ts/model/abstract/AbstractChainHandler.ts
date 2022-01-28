import {isUndefined} from "lodash";

abstract class AbstractChainHandler<T extends object> implements IChainHandler<T> {
    private nextHandler?: IChainHandler<T>;
    protected abstract field: Partial<keyof T>;
    protected abstract referenceField?: Partial<keyof T>;

    protected abstract rules(): TValidatorRules<IValidator<T>, T>;

    constructor(protected repository: IRepository<T>, private validator?: IValidator<T>) {
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

    private execute(request: Partial<T>): void {
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

    protected checkValue(request: Partial<T>): boolean {
        if (isUndefined(this.validator)) return true;
        for (const rule in this.rules()) {
            console.log(rule);
        }
        return true;
    }

}

export default AbstractChainHandler;