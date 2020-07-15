import Slider from "../../src/ts/controllers/Slider";
import $ from 'jquery';

describe("Тестируем контроллер", function () {
    let slider: ISubscriber & IPublisher;
    const options: MainOptionsType = {
        ruler: [-2399, 5484],
        points: [3, 1688]
    };
    const parent = $(document.createElement('div'));
    const subscriber = {
        update: jest.fn(x => x)
    }
    beforeEach(() => {
        slider = new Slider(options, parent);
        slider.attach(subscriber);
    });
    it('должен соответствовать снимку', function () {
        expect(parent)
            .toMatchSnapshot()
    });
    it('должен переместить точку на новое место, оповестить подписчика и соответствовать снимку', function () {
        slider.update([-400]);
        expect(slider.state)
            .toStrictEqual([-400, 1688]);
        expect(subscriber.update.mock.results[0].value)
            .toStrictEqual([-400, 1688]);
        expect(parent)
            .toMatchSnapshot();
    });
})