interface IValidator<T extends object> {
    less(value: keyof T, then: keyof T, object: T, referencePoint: keyof T): T;

    more(value: keyof T, then: keyof T, object: T, referencePoint: keyof T): T;

    multiple(value: keyof T, then: keyof T, object: T, referencePoint: keyof T): T;
}