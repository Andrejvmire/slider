interface IModelSlider<K extends keyof V, V extends TModelOptions> {
    value(): TModelOptions;

    value(key: K): V;

    value(key: K, value: V): void;
}
