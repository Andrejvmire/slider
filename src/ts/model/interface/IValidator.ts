interface IValidator<T extends object> {
    less(value: T[keyof T], then: keyof T, strictly?: boolean): boolean;

    more(value: T[keyof T], then: keyof T, strictly?: boolean): boolean;

    multiple(value: T[keyof T], of: keyof T, object: T): T;
}