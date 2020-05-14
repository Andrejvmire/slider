import {Slider} from '../../../src/ts/models/Slider';

describe('Slider model test', function () {
    beforeEach(() => {
        this.slider = new Slider(0, 100, [30,70])
    });
    describe('Slider exception', () => {
        it('should throw Exception', () => {
            expect(
                () => {
                    new Slider(50, 20, [30, 70]);
                }
            )
                .toThrowError();
        });
        it('should throw move point', () => {
            expect(
                () => {
                    this.slider.points[0].to(-1);
                }
            )
                .toThrowError();
        });
    })
    describe('Slider test', () => {

        it('should test slider', () => {
            expect(this.slider.values())
                .toStrictEqual([30,70])
        });
        it('should move first point', () => {
            this.slider.points.move(0).to(20);
            expect(this.slider.values())
                .toStrictEqual([20, 70])
        });
        it('should move second point to out of range', () => {
            this.slider.points.move(1).to(10);
            expect(this.slider.values())
                .toStrictEqual([20, 70])
        });
    })
})