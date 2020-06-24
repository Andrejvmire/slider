import TooltipsView from "../../src/ts/views/TooltipsView";
import TooltipView from "../../src/ts/views/TooltipView";

describe('тестируем TooltipsView', () => {
    let tooltips: IViewSubscriber & IIterable<IViewSubscriber & IView>;
    describe('обработка корректных данных', () => {
        beforeEach(() => {
            tooltips = new TooltipsView(33, 'horizontal');
        })
        it('вернет не undefined', () => {
            expect(tooltips)
                .not.toBeUndefined();
        });
        it('вернет объект класса TooltipView', () => {
            expect(Array.from(tooltips)[0])
                .toBeInstanceOf(TooltipView);
        });
    })
})