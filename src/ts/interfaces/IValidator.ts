interface IValidatorConstructor {
    valid: boolean;
    errors: string[];
}

interface IValidator {
    callValidator(functionName: string, value: any, condition: any): IValidatorConstructor
}