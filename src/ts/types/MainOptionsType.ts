type MainOptionsType = {
    ruler: [number, number],
    points: PointsType,
    step?: number,
    orientation?: 'vertical' | 'horizontal',
    value?(points: PointsType): void,
    tooltip?: boolean
}