type TValidatorRules<T, V> = Partial<{
    [K in keyof T]: keyof V | undefined;
}>