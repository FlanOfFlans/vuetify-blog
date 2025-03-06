
export type Rule = (value: unknown) => boolean | string;

export const isRequired = (onFail: string): Rule =>
    (value: unknown) =>
        value ? true : onFail