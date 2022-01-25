import {isUndefined} from "lodash";

abstract class Validator<T extends object> implements IValidator<T> {
    protected abstract rules(): TValidatorRules<T>;

    protected repository: IRepository<T>;

    less(value: T[keyof T], then: keyof T, strictly = false): boolean {
        const valueFromRepository = this.repository.get(then);

        if (isUndefined(valueFromRepository)) {
            return false;
        } else {
            return strictly ? value <= valueFromRepository : value < valueFromRepository;
        }
    }

    more(value: T[keyof T], then: keyof T, strictly = false): boolean {
        const valueFromRepository = this.repository.get(then);

        if (isUndefined(valueFromRepository)) {
            return false;
        } else {
            return strictly ? value >= valueFromRepository : value > valueFromRepository;
        }
    }

    multiple(value: T[keyof T], of: keyof T, object: T): T {
        return object;
    }
}