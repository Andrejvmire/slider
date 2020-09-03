import DataState from "./DataState";
import {Validator} from "../models/Validator";

export default abstract class ValidDataState extends DataState {
    private _validator: IValidatorConstructor | undefined;

    /**
     * переопределенный метод должен возвращать массив правил для валидации
     * @returns {RuleType[]}
     */
    abstract rules(): RuleType[];

    /**
     *
     * @param {string} fieldName
     * @param value
     * @returns {DataState}
     */
    setState(fieldName: string, value: any): DataState {
        for (let rule of this.rules()) {
            if (fieldName in rule) {
                let [validationFunction, condition] = rule[fieldName];
                let conditionField, conditionValue;
                if (typeof condition === "object" && "field" in condition) {
                    conditionField = condition.field;
                    conditionValue = this.getState(conditionField);
                } else if (typeof condition === "string") {
                    conditionValue = this.getState(condition);
                }
                this._validator = Validator.callValidator(validationFunction, value, conditionValue);
            }
            if (typeof this._validator === "undefined" || this._validator.valid) {
                super.setState(fieldName, value);
            }
        }
        return this;
    }

    /**
     * передает вызов родительскому классу
     * @param {string} fieldName
     * @returns {any}
     */
    getState(fieldName?: string): any {
        return super.getState(fieldName);
    }
}
