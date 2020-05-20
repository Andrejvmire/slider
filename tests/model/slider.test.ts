import Slider, {sliderConstructor} from '../../src/ts/models/Slider';

describe("Модель Slider", function () {
    const startObj = <sliderConstructor>{from: 0, to: 120, points: [0, 120]}
    describe('Обработка некорректных данных', function () {
        beforeEach(() => {
            this.slider = new Slider(startObj);
        })
        it('новая величина за пределами (не будет принята)', () => {
            expect(
                this.slider.move(130).values()
            )
                .toStrictEqual({min: 0, max: 120, points: [0, 120]})
        });
        it('Не сделает шаг за предельные значения вправо', () => {
            expect(
                this.slider.nextPoint(120).values()
            )
                .toStrictEqual({min: 0, max: 120, points: [0, 120]})
        });
        it('Не сделает шаг за предельные значения влево', () => {
            expect(
                this.slider.prevPoint(0).values()
            )
                .toStrictEqual({min: 0, max: 120, points: [0, 120]})
        });
    })

    describe('Корректные данные', () => {
        it('Вернет значения с одной точкой', () => {
            expect(
                (new Slider(<sliderConstructor>{from: 10, to: 120, points: 30}))
                        .values()
            )
                .toStrictEqual({min: 10, max: 120, points: [30]})
        });
        it('вернет все переданные значения', () => {
            expect(
                (new Slider(<sliderConstructor>{from: 10, to: 120, points: [30, 60]}))
                    .values()
            )
                .toStrictEqual({min: 10, max: 120, points: [30, 60]})
        })
        it('объеденит две переданные точки с одинаковыми значениями', () => {
            expect(
                (new Slider(<sliderConstructor>{from: 10, to: 120, points: [30, 30]}))
                    .values()
            )
                .toStrictEqual({min: 10, max: 120, points: [30]})
        });
        it('Передвинет ближайшую к переданному значению  точку (30 => 20)', () => {
            expect(
                (new Slider(<sliderConstructor>{from: 10, to: 120, points: [30, 60]}))
                    .move(20).values()
            )
                .toStrictEqual({min: 10, max: 120, points: [20, 60]})
        });
        it('Передвинет ближайшую к переданному значению  точку (60 => 70)', () => {
            expect(
                (new Slider(<sliderConstructor>{from: 10, to: 120, points: [30, 60]}))
                    .move(70)
                    .values()
            )
                .toStrictEqual({min: 10, max: 120, points: [30, 70]})
        });
        it('Передвинет точку (30) на один шаг (1) вправо', () => {
            expect(
                (new Slider(<sliderConstructor>{from: 10, to: 120, points: [30, 60]}))
                    .nextPoint(30)
                    .values()
            )
                .toStrictEqual({min: 10, max: 120, points: [31, 60]})
        });
        it('Передвинет точку (30) на один шаг (1) влево', () => {
            expect(
                (new Slider(<sliderConstructor>{from: 10, to: 120, points: [30, 60]}))
                    .prevPoint(30)
                    .values()
            )
                .toStrictEqual({min: 10, max: 120, points: [29, 60]})
        });
        it('Передвинет точку (30) на один шаг (15) влево', () => {
            expect(
                (new Slider(<sliderConstructor>{from: 10, to: 120, points: [30, 60], step: 15}))
                    .prevPoint(30)
                    .values()
            )
                .toStrictEqual({min: 10, max: 120, points: [15, 60]})
        });
        it('Передвинет точку (30) на один шаг (22) вправо', () => {
            expect(
                (new Slider(<sliderConstructor>{from: 10, to: 120, points: [30, 60], step: 22}))
                    .nextPoint(30)
                    .values()
            )
                .toStrictEqual({min: 10, max: 120, points: [52, 60]})
        });
    });
    describe('Тест колбэков', () => {
        const slider = new Slider({from: 0, to: 120, points: [60, 40]}),
            subscriber = {
                update: jest.fn(x => x)
            },
            startObj = {min: 0, max: 120}
        slider.attach(subscriber);
        it('Должен вернуть точки 20, 60', function () {
            slider.move(20);
            expect(subscriber.update.mock.results[0].value)
                .toStrictEqual(Object.assign(startObj, {points: [20, 60]}))
        });
        it('Должен вернуть сдвиг точки вправо (60 + 1)', function () {
            slider.nextPoint(60);
            expect(subscriber.update.mock.results[1].value)
                .toStrictEqual(Object.assign(startObj, {points: [20, 61]}))
        });
        it('Должен вернуть сдвиг точки влево 20 - 1', function () {
            slider.prevPoint(20);
            expect(subscriber.update.mock.results[2].value)
                .toStrictEqual(Object.assign(startObj, {points: [19, 61]}))
        });
        it('Долже вернуть undefined - Slider отписался от Points', function () {
            slider.detach(subscriber);
            expect(subscriber.update.mock.results[3])
                .toStrictEqual(undefined)
        });
    })
})