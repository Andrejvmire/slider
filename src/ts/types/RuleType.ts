type ConditionObjectType = {
    field: string,
}

type ConditionStringType = string;

type Condition = ConditionObjectType | ConditionStringType;

type RuleType = {
    [index: string]: [string, Condition],
}