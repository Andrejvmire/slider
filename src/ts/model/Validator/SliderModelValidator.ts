import {isUndefined} from "lodash";

class SliderModelValidator implements IValidator<TModelOptions> {

    less(value: keyof TModelOptions, then: keyof TModelOptions, object: TModelOptions): TModelOptions {
        const val = object[value],
            th = object[then];
        if (isUndefined(val) || isUndefined(th)) {
            return object;
        }
        object[value] = val >= th ? th : val;
        return object;
    }

    more(value: keyof TModelOptions, then: keyof TModelOptions, object: TModelOptions): TModelOptions {
        const val = object[value],
            th = object[then];
        if (isUndefined(val) || isUndefined(th)) {
            return object;
        }
        object[value] = val <= th ? th : val;
        return object;
    }

    multiple(value: keyof TModelOptions, then: keyof TModelOptions, object: TModelOptions, referencePoint: keyof TModelOptions): TModelOptions {
        const val = object[value],
            th = object[then],
            refP = object[referencePoint];
        if (isUndefined(val) || isUndefined(th) || isUndefined(refP)) return object;
        const valueFromReferencePoint = val - refP;
        const multiplicity = valueFromReferencePoint % th;
        if (multiplicity !== 0) {
            if ((multiplicity / th) < 0.5) {
                object[value] = val - multiplicity;
            } else {
                object[value] = val + (th - multiplicity);
            }
        }
        return object;
    }
}

export default SliderModelValidator;