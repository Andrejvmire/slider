import Slider from '../../src/ts/models/SliderModel';

describe("Модель Slider", function () {
    const startObj = <SliderOptionsType>{ruler: [0, 120], points: [0, 120]}
    describe('Обработка некорректных данных', function () {
        it('новая величина за пределами (не будет принята)', () => {
            expect(
                (() => {
                    let slider = new Slider(startObj);
                    slider.move(130);
                    return slider.value
                })()
            )
                .toStrictEqual({min: 0, max: 120, points: [0, 120], step: 1})
        });
        it('Не сделает шаг за предельные значения вправо', () => {
            expect(
                (() => {
                    let slider = new Slider(startObj);
                    slider.next(120);
                    return slider.value
                })()
            )
                .toStrictEqual({min: 0, max: 120, points: [0, 120], step: 1})
        });
        it('Не сделает шаг за предельные значения влево', () => {
            expect(
                (() => {
                    let slider = new Slider(startObj);
                    slider.prev(0);
                    return slider.value
                })()
            )
                .toStrictEqual({min: 0, max: 120, points: [0, 120], step: 1})
        });
    })

    describe('Корректные данные', () => {
        it('Вернет значения с одной точкой', () => {
            expect(
                (new Slider(<SliderOptionsType>{ruler: [10, 120], points: 30}))
                    .value
            )
                .toStrictEqual({min: 10, max: 120, points: [30], step: 1})
        });
        it('вернет все переданные значения', () => {
            expect(
                (new Slider(<SliderOptionsType>{ruler: [10, 120], points: [30, 60]}))
                    .value
            )
                .toStrictEqual({min: 10, max: 120, points: [30, 60], step: 1})
        })
        // Удалена функция генерации одной точки вместо 2-х с одинаковым значением
        // it('объеденит две переданные точки с одинаковыми значениями', () => {
        it('Не объеденит две переданные точки с одинаковыми значениями', () => {
            expect(
                (new Slider(<SliderOptionsType>{ruler: [10, 120], points: [30, 30]}))
                    .value
            )
                .toStrictEqual({min: 10, max: 120, points: [30, 30], step: 1})
        });
        it('Передвинет ближайшую к переданному значению  точку (30 => 20)', () => {
            expect(
                (() => {
                    let slider = new Slider(<SliderOptionsType>{ruler: [10, 120], points: [30, 60]});
                    slider.move(20);
                    return slider.value;
                })()
            )
                .toStrictEqual({min: 10, max: 120, points: [20, 60], step: 1})
        });
        it('Передвинет ближайшую к переданному значению  точку (60 => 70)', () => {
            expect(
                (() => {
                    let slider = new Slider(<SliderOptionsType>{ruler: [10, 120], points: [30, 60]});
                    slider.move(70);
                    return slider.value;
                })()
            )
                .toStrictEqual({min: 10, max: 120, points: [30, 70], step: 1})
        });
        it('Передвинет точку (30) на один шаг (1) вправо', () => {
            expect(
                (() => {
                    let slider = new Slider(<SliderOptionsType>{ruler: [10, 120], points: [30, 60]});
                    slider.next(30);
                    return slider.value;
                })()
            )
                .toStrictEqual({min: 10, max: 120, points: [31, 60], step: 1})
        });
        it('Передвинет точку (30) на один шаг (1) влево', () => {
            expect(
                (() => {
                    let slider = new Slider(<SliderOptionsType>{ruler: [10, 120], points: [30, 60]});
                    slider.prev(30);
                    return slider.value;
                })()
            )
                .toStrictEqual({min: 10, max: 120, points: [29, 60], step: 1})
        });
        it('Передвинет точку (30) на один шаг (15) влево', () => {
            expect(
                (() => {
                    let slider = new Slider(<SliderOptionsType>{ruler: [10, 120], points: [30, 60], step: 15});
                    slider.prev(30);
                    return slider.value;
                })()
            )
                .toStrictEqual({min: 10, max: 120, points: [15, 60], step: 15})
        });
        it('Передвинет точку (30) на один шаг (22) вправо', () => {
            expect(
                (() => {
                    let slider = new Slider(<SliderOptionsType>{ruler: [10, 120], points: [30, 60], step: 22});
                    slider.next(30);
                    return slider.value;
                })()
            )
                .toStrictEqual({min: 10, max: 120, points: [52, 60], step: 22})
        });
    });
    describe('Тест колбэков', () => {
        const slider = new Slider({ruler: [0, 120], points: [60, 40]}),
            subscriber = {
                update: jest.fn(x => x)
            },
            startObj = {min: 0, max: 120, step: 1}
        slider.attach(subscriber);
        it('Должен вернуть точки 20, 60', function () {
            slider.move(20);
            expect(subscriber.update.mock.results[0].value)
                .toStrictEqual(Object.assign(startObj, {points: [20, 60]}))
        });
        it('Должен вернуть сдвиг точки вправо (60 + 1)', function () {
            slider.next(60);
            expect(subscriber.update.mock.results[1].value)
                .toStrictEqual(Object.assign(startObj, {points: [20, 61]}))
        });
        it('Должен вернуть сдвиг точки влево 20 - 1', function () {
            slider.prev(20);
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