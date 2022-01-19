interface IValidator<V1, V2> {
    less(value: V1, then: V2, strictly?: boolean): boolean;

    more(value: V1, then: V2, strictly?: boolean): boolean;

    multiple(value: V1, of: V2): boolean;
}