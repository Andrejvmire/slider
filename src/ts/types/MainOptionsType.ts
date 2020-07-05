type MainOptionsType = {
    ruler: RulerType,
    points: PointsType,
    step?: number,
    orientation?: SliderOrientationType,
    value?(points: PointsType): void,
    tooltip?: boolean,
    ranger?: boolean | "revert",
}