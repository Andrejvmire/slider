import Slider from '../../src/ts/models/SliderModel';

describe("Модель Slider", function () {
    const startObj: ModelOptionsType = {ruler: [0, 120], points: [0, 120]}
    describe('Обработка некорректных данных', function () {
        it('Будет вызвана ошибка при создании модели (Points за пределами Ruler`а) для 1-ой точки', function () {
            const errorInSlider = () => {
                return new Slider({ruler: [0, 20], points: 25})
            }
            expect(() => errorInSlider())
                .toThrowError()
        });
        it('Будет вызвана ошибка при создании модели (Points за пределами Ruler`а) для массива точек', function () {
            const errorInSlider = () => {
                return new Slider({ruler: [0, 20], points: [3, 25]})
            }
            expect(() => errorInSlider())
                .toThrowError()
        });
        it('новая величина за пределами (не будет принята)', () => {
            expect(
                (() => {
                    let slider = new Slider(startObj);
                    slider.move(130);
                    return slider.state
                })()
            )
                .toStrictEqual({ruler: {min: 0, max: 120}, points: [0, 120]})
        });
        it('Не сделает шаг за предельные значения вправо', () => {
            expect(
                (() => {
                    let slider = new Slider(startObj);
                    slider.move(121, 120);
                    return slider.state
                })()
            )
                .toStrictEqual({ruler: {min: 0, max: 120}, points: [0, 120]})
        });
        it('Не сделает шаг за предельные значения влево', () => {
            expect(
                (() => {
                    let slider = new Slider(startObj);
                    slider.move(-1, 0);
                    return slider.state
                })()
            )
                .toStrictEqual({ruler: {min: 0, max: 120}, points: [0, 120]})
        });
    })

    describe('Корректные данные', () => {
        it('Вернет значения с одной точкой', () => {
            expect(
                (new Slider(<ModelOptionsType>{ruler: [10, 120], points: 30}))
                    .state
            )
                .toStrictEqual({ ruler: {min: 10, max: 120}, points: [30]})
        });
        it('вернет все переданные значения', () => {
            expect(
                (new Slider(<ModelOptionsType>{ruler: [10, 120], points: [30, 60]}))
                    .state
            )
                .toStrictEqual({ ruler: {min: 10, max: 120}, points: [30, 60]})
        })
        // Удалена функция генерации одной точки вместо 2-х с одинаковым значением
        // it('объеденит две переданные точки с одинаковыми значениями', () => {
        it('Не объеденит две переданные точки с одинаковыми значениями', () => {
            expect(
                (new Slider(<ModelOptionsType>{ruler: [10, 120], points: [30, 30]}))
                    .state
            )
                .toStrictEqual({ ruler: {min: 10, max: 120}, points: [30, 30]})
        });
        it('Передвинет ближайшую к переданному значению  точку (30 => 20)', () => {
            expect(
                (() => {
                    let slider = new Slider(<ModelOptionsType>{ruler: [10, 120], points: [30, 60]});
                    slider.move(20);
                    return slider.state;
                })()
            )
                .toStrictEqual({ ruler: {min: 10, max: 120}, points: [20, 60]})
        });
        it('Передвинет ближайшую к переданному значению  точку (60 => 70)', () => {
            expect(
                (() => {
                    let slider = new Slider(<ModelOptionsType>{ruler: [10, 120], points: [30, 60]});
                    slider.move(70);
                    return slider.state;
                })()
            )
                .toStrictEqual({ ruler: {min: 10, max: 120}, points: [30, 70]})
        });
        it('Передвинет точку (30) на один шаг (1) вправо', () => {
            expect(
                (() => {
                    let slider = new Slider(<ModelOptionsType>{ruler: [10, 120], points: [30, 60]});
                    slider.move(31, 30);
                    return slider.state;
                })()
            )
                .toStrictEqual({ ruler: {min: 10, max: 120}, points: [31, 60]})
        });
        it('Передвинет точку (30) на один шаг (1) влево', () => {
            expect(
                (() => {
                    let slider = new Slider(<ModelOptionsType>{ruler: [10, 120], points: [30, 60]});
                    slider.move(29, 30);
                    return slider.state;
                })()
            )
                .toStrictEqual({ ruler: {min: 10, max: 120}, points: [29, 60]})
        });
        it('Передвинет точку (30) на один шаг (15) влево', () => {
            expect(
                (() => {
                    let slider = new Slider(<ModelOptionsType>{ruler: [10, 120], points: [30, 60], step: 15});
                    slider.move(15, 30);
                    return slider.state;
                })()
            )
                .toStrictEqual({ ruler: {min: 10, max: 120}, points: [15, 60]})
        });
        it('Передвинет точку (30) на один шаг (22) вправо', () => {
            expect(
                (() => {
                    let slider = new Slider(<ModelOptionsType>{ruler: [10, 120], points: [30, 60]});
                    slider.move(52, 30);
                    return slider.state;
                })()
            )
                .toStrictEqual({ ruler: {min: 10, max: 120}, points: [52, 60]})
        });
    });
    describe('Тест колбэков', () => {
        const slider = new Slider({ruler: [0, 120], points: [60, 40]}),
            subscriber = {
                update: jest.fn(x => x)
            },
            startObj = {ruler: {min: 10, max: 120}}
        slider.attach(subscriber);
        slider.move(20);
        slider.move(61, 60);
        slider.move(19, 20);
        slider.detach(subscriber);
        it('Повторная подписка не должна вызвать ошибку', function () {
            expect(() => slider.attach(subscriber))
                .not.toThrowError()
        });
        it('Должен вернуть точки 20, 60', function () {
            expect(subscriber.update.mock.results[0].value)
                .toStrictEqual([20, 60])
        });
        it('Должен вернуть сдвиг точки вправо (60 + 1)', function () {
            expect(subscriber.update.mock.results[1].value)
                .toStrictEqual([20, 61])
        });
        it('Должен вернуть сдвиг точки влево 20 - 1', function () {
            expect(subscriber.update.mock.results[2].value)
                .toStrictEqual([19, 61])
        });
        it('Не должен вернуть ошибку при повторной отписки', function () {
            expect(()=> slider.detach(subscriber))
                .not.toThrowError()
        });
    })
})