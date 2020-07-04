import PointsView from "../../src/ts/views/PointsView";
import PointView from "../../src/ts/views/PointView";

describe('тестируем PointsView', () => {
    let points: IViewPublisher & IViewSubscriber & IIterable<IViewPublisher & IPoint> & IPoints;
    describe('Обработка корректных данных с 2 точками', () => {
        beforeEach(() => {
            points = new PointsView([345, 55], "left", [32, 647]);
        })
        it('Вернет не undefined', () => {
            expect(points)
                .not.toBeUndefined();
        });
        it('вернет значения в порядке возрастания', () => {
            expect(points.state)
                .toStrictEqual([55, 345])
        });
        it("Вернет экземпляр PointView", () => {
            expect(Array.from(points)[0])
                .toBeInstanceOf(PointView);
        });
        it('Переместит состояние с учетом перемещения 1-ой точки', () => {
            expect(points.move(300, 55).state)
                .toStrictEqual([300, 345])
        });
        it('Переместит состояние с учетом перемещения 2-ой точки', () => {
            expect(points.move(355, 345).state)
                .toStrictEqual([55, 355])
        });
    });
    describe('Обработка корректных данных с 1-ой точкой', () => {
        beforeEach(() => {
            points = new PointsView(22, "top", [-44, 90])
        });
        it('Вернет не undefined', function () {
            expect(points)
                .not.toBeUndefined();
        });
        it('Состояние - массив из 1-ого значения [22]', function () {
            expect(points.state)
                .toStrictEqual([22])
        });
    })
})