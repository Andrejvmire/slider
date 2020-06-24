import RulerView from "../../src/ts/views/RulerView";
import $ from 'jquery';

describe('Тестируем RulerView', () => {
    let ruler: IView;
    describe('Обработка корректных данных', () => {
        beforeEach(() => {
            ruler = new RulerView([20, 300], "horizontal");
        })
        it('Вернет не undefined', () => {
            expect(ruler)
                .not.toBeUndefined();
        })
        it('Вернет объект JQuery', () => {
            expect(ruler.$instance)
                .toBeInstanceOf($)
        });
        it('вернет массив из 2-х значений [20, 300]', () => {
            expect(ruler.state)
                .toStrictEqual([20, 300]);
        });
    })
})