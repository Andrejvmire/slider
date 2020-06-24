import RangerView from "../../src/ts/views/RangerView";
import $ from 'jquery';
import mock = jest.mock;
import fn = jest.fn;

describe('тестируем RangerView', () => {
    let ranger: IViewSubscriber & IView,
        ranger2: IView & IViewSubscriber,
        pointInPercent = jest.fn((x:number, y: [number,number]) => {
            return (x - y[0]) * 100 / y.reduce((p, c) => c - p);
        })
    describe('корректные данные', () => {
        beforeEach(() => {
            ranger = new RangerView([45, 89], [0, 300]);
        })
        it('Вернет не undefined', () => {
            expect(ranger)
                .not.toBeUndefined()
        });
        it('Вернет объект JQuery', () => {
            expect(ranger.$instance)
                .toBeInstanceOf($);
        });
        it('Вернет состояние - массив из 2-х значений', () => {
            expect(ranger.state)
                .toStrictEqual([
                    pointInPercent(45, [0, 300]),
                    pointInPercent(89, [0, 300])
                ])
        });
    })
})