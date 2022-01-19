import {isUndefined} from "lodash";

abstract class Validator<T> implements IValidator<keyof T, keyof T> {
    protected abstract rules(): TValidatorRules<T>;

    protected repository: IRepository<keyof T, T> | undefined;

    less(value: keyof T, then: keyof T, strictly = false): boolean {
        const v1 = this.repository?.get(value),
            v2 = this.repository?.get(then);

        if (isUndefined(this.repository)) {
            return false;
        } else if (isUndefined(v1) || isUndefined(v2)) {
            return true;
        } else {
            return strictly ? v1 <= v2 : v1 < v2;
        }
    }

    more(value: keyof T, then: keyof T, strictly = false): boolean {
        return this.less(then, value, strictly);
    }

    multiple(value: keyof T, of: keyof T): boolean {
        return false;
    }
}