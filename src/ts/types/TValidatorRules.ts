type TValidatorRules<T> = {
    [K in keyof T]: IValidatorRule<K, T>[];
}