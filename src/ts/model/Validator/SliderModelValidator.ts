import {isUndefined} from "lodash";

class SliderModelValidator implements IValidator<TModelOptions> {

    less(value: keyof TModelOptions, then: keyof TModelOptions, object: TModelOptions): TModelOptions {
        if (isUndefined(object[value]) || isUndefined(object[then])) return object;
        object[value] = object[value] >= object[then] ? object[then] : object[value];
        return object;
    }

    more(value: keyof TModelOptions, then: keyof TModelOptions, object: TModelOptions): TModelOptions {
        if (isUndefined(object[value]) || isUndefined(object[then])) return object;
        object[value] = object[value] <= object[then] ? object[then] : object[value];
        return object;
    }

    multiple(value: keyof TModelOptions, then: keyof TModelOptions, object: TModelOptions, referencePoint: keyof TModelOptions): TModelOptions {
        if (isUndefined(object[value]) || isUndefined(object[then])) return object;
        const valueFromReferencePoint = object[value] - object[referencePoint];
        const multiplicity = valueFromReferencePoint % object[then];
        if (multiplicity !== 0) {
            if ((multiplicity / object[then]) < 0.5) {
                object[value] -= multiplicity;
            } else {
                object[value] += (object[then] - multiplicity);
            }
        }
        return object;
    }
}

export default SliderModelValidator;