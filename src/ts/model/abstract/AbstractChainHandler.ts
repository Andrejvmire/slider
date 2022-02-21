import {isUndefined} from "lodash";
import {inject, injectable} from "tsyringe";

// @ts-ignore
@injectable()
abstract class AbstractChainHandler<T extends object> implements IChainHandler<T> {
    private nextHandler?: IChainHandler<T>;

    protected abstract field: Partial<keyof T>;

    protected abstract rules(): TValidatorRules<IValidator<T>, T>;

    constructor(
        @inject("IRepository") private repository: IRepository<T>,
        @inject("IValidator") private validator?: IValidator<T>
    ) {
    }

    public handle(request: Partial<T>): boolean {
        const checkValue = this.checkValue(request);
        if (checkValue) {
            this.execute(request);
            if (!isUndefined(this.nextHandler)) {
                return this.nextHandler.handle(request);
            } else {
                this.repository.acceptValues();
            }
        } else {
            this.repository.rollback();
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

    protected checkValue(request: Partial<T>): boolean {
        if (isUndefined(this.validator)) {
            throw new Error("Validator module was not passed")
        }
        let validateMethod: keyof IValidator<T>,
            chainName: keyof T;
        // @ts-ignore
        for ([validateMethod, chainName] of Object.entries(this.rules())) {
            if (validateMethod in this.validator) {
                Object.call(this.validator[validateMethod], this.field, chainName, request);
            }
        }
        return true;
    }

}

export default AbstractChainHandler;