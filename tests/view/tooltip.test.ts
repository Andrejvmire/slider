import TooltipView from "../../src/ts/views/TooltipView";
import $ from 'jquery';

describe('Tooltip View', function () {
    let tooltip: IView & IViewSubscriber;
    beforeEach(() => {
        tooltip = new TooltipView(4, "horizontal");
    })
    it('должен вернуть значение 4', function () {
        expect(tooltip.state)
            .toStrictEqual(4)
    });
    it('должен вернуть объект JQuery', function () {
        expect(tooltip.$instance)
            .toBeInstanceOf($)
    });
    it('должен содержать классы slider slider__tooltip', function () {
        expect(tooltip.$instance.hasClass('slider slider__tooltip'))
            .toBeTruthy()
    });
});