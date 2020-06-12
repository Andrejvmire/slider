import Points from "../../src/ts/models/PointsModel";
import PointsModel from "../../src/ts/models/PointsModel";

describe("Class 'Points'", function () {
    describe("Success", () => {
        it('Должен создать одну точку', () => {
            expect(
                (new Points(6)).state
            )
                .toStrictEqual([6]);
        });
        it('Должен переместить точку с 55 на 56', () => {
            expect(
                (new Points([55, 77])).move(56, 55).state
            )
                .toStrictEqual([56, 77])
        });
        it('Должен переместить точку с 55 на 54', () => {
            expect(
                (new Points(55)).move(54, 55).state
            )
                .toStrictEqual([54])
        });
        it('Должен вызвать ошибку step < 0', () => {
            expect(() => new Points([3,45], -1))
                .toThrowError();
        });
    });
    describe("Подписываемся на PointsModel", function () {
        let points: IModelPublisher & IPoints,
            subscriber = {
                update: jest.fn(x => x)
            };
        beforeEach(() => {
            points = new PointsModel([33, 86]);
            points.attach(subscriber);
        });
        it('Переместит 33 на 58', () => {
            points.move(58, 33);
            expect(subscriber.update.mock.results[0].value)
                .toStrictEqual([58, 86])
        });
    })
})