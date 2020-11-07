import ValidDataState from "../abstract/ValidDataState";

export default class ModelState extends ValidDataState {

    rules(): RuleType[] {
        return [
            {
                "points": ["inRange", {"field": "ruler"}]
            },
        ];
    }
}
