export default class ValidationErrors {
    constructor(messages: IValidator) {
        messages.errors
            .map(
                message => {
                    throw new Error(message);
                }
            )
    }
}