type returnValue = {
    min: number,
    max: number
}

export default class Ruler {
    private _value: number[] | string[] | undefined;

    constructor(private _min: number, private _max: number, private _step: number = 1) {}

    get min(): number {
        return this._min;
    }

    get max(): number {
        return this._max;
    }

    get step(): number {
        return this._step;
    }

    get delimiters(): returnValue {
        return {
            min: this.min,
            max: this.max
        }
    }

    getValue(index: number): number | string {
        if (typeof this._value === 'undefined') return index;
        return this._value[index];
    }

    checkValue(value: number | number[]): boolean {
        const compare = (value: number) => {
            if (!(value >= this._min && value <= this._max)) {
                throw new Error(`Point value ${value} out of range: less ${this._min} or more ${this._max}`);
            }
        }
        if (Array.isArray(value)) {
            value
                .map(
                    item => {
                        compare(item);
                    }
                )
        } else {
            compare(value);
        }
        return true;
    }
}