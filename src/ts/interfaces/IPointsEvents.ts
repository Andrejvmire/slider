interface IPointsEvents {
    move(newValue: number): IPointsEvents;

    moveTo(curValue: number, nextValue: number): IPointsEvents;

    value: PointsResponseType;
}