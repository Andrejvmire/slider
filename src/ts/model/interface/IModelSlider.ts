interface IModelSlider {
    value(): TModelOptions;

    value(key: string): number;

    value(key: string, value: number): void;
}
