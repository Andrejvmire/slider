type TPoints =
    | {
    from: number,
    to?: number
}
    | {
    from?: number,
    to: number
}