import PointView from "../../src/ts/views/PointView";
import $ from 'jquery';
import {pointInPercents} from "../../src/ts/views/pointInPercents";

describe("Тестируем PointView", () => {
    describe("Обработка корректных данных", () => {
        let point: IViewPublisher & IPoint;
        beforeAll(() => {
            point = new PointView(40, "left", [0,100]);
        })
        it('Вернет не null', () => {
            expect(point.state)
                .not.toBeUndefined();
        });
        it('Вернет объект JQuery', () => {
            expect(point.$instance)
                .toBeInstanceOf($)
        });
        it('вернет объект с позицией 40%', function () {
            expect(point.$instance.attr('style'))
                .toEqual("left: 40%;")
        });
        it('содержит классы slider slider__point', function () {
            expect(point.$instance.hasClass('slider slider__point'))
                .toBeTruthy()
        });
        it('не изменит значение при перемещении в точку за границами', function () {
            point.moveTo(101);
            expect(point.state)
                .toStrictEqual(40)
        });
    })
})