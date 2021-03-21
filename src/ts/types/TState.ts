type TState<V extends string | number> = {
    min: number,
    max: number,
    from: number,
    to: number,
    values?: V[],
    step: number
}