interface IPointsEvents {
    move(newValue: number): IPointsEvents;

    nextTo(curValue: number, nextValue: number): IPointsEvents;

    value: PointsResponseType;
}