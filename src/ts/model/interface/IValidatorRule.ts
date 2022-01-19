interface IValidatorRule<K extends keyof T, T> {
    "field": K;
    callback: IValidator<T, T>;
}