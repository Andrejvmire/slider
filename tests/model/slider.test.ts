import Slider from '../../src/ts/models/Slider';

describe("Slider model", function () {
    describe('Test Slider model exceptions', function () {
        beforeEach(() => {
            this.slider = new Slider(0, 100);
        })
        it('should return Error "out of range"', () => {
            expect(
                () => this.slider.points([200])
            )
                .toThrowError()
        });
        it('should return empty object', () => {
            expect(
                this.slider.values()
            )
                .toStrictEqual({});
        });
        it('should stay at the old value', () => {
            expect(
                this.slider.points([30,60]).move(130).values()
            )
                .toStrictEqual({min: 0, max: 100, points:[30,60]})
        });
        it('should dont move on one step', () => {
            expect(
                this.slider.points([20, 100]).nextPoint(100).values()
            )
                .toStrictEqual({min: 0, max: 100, points: [20, 100]})
        });
        it('should dont move on one step left', () => {
            expect(
                this.slider.points([0, 100]).prevPoint(0).values()
            )
                .toStrictEqual({min: 0, max: 100, points: [0, 100]})
        });
    })

    describe('Test Slider model', () => {
        beforeEach(() => {
            this.slider = new Slider(10, 120);
        })
        it('should return empty object', () => {
            expect(
                this.slider.values()
            )
                .toStrictEqual({});
        });
        it('should return empty object (on move point)', () => {
            expect(
                this.slider.nextPoint(44).values()
            )
                .toStrictEqual({})
        });
        it('should return object whit single point', () => {
            this.slider.points([30]);
            expect(
                this.slider.values()
            )
                .toStrictEqual({min: 10, max: 120, points: [30]})
        });
        it('Slider values', () => {
            this.slider.points([30, 60]);
            expect(
                this.slider.values()
            )
                .toStrictEqual({min: 10, max: 120, points: [30, 60]})
        })
        it('should return single value', () => {
            expect(
                this.slider.points([30,30]).values()
            )
                .toStrictEqual({min: 10, max: 120, points: [30]})
        });
        it('should move first point to 20', () => {
            expect(
                this.slider.points([30, 60]).move(20).values()
            )
                .toStrictEqual({min: 10, max: 120, points: [20, 60]})
        });
        it('should move second point to 70', () => {
            expect(
                this.slider.points([30,60]).move(70).values()
            )
                .toStrictEqual({min: 10, max: 120, points: [30, 70]})
        });
        it('should create point', () => {
            expect(
                this.slider.move(40).values()
            )
                .toStrictEqual({})
        });
        it('should move right on one step', () => {
            expect(
                this.slider.points([20, 70]).nextPoint(20).values()
            )
                .toStrictEqual({min: 10, max: 120, points: [21, 70]})
        });
        it('should move right on one step', () => {
            expect(
                this.slider.points([21, 70]).prevPoint(21).values()
            )
                .toStrictEqual({min: 10, max: 120, points: [20, 70]})
        });
    })
})