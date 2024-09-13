export const isString = (maybeString: unknown): maybeString is string => {
    return typeof maybeString === 'string';
}

export const isObject = (value: unknown): value is object => {
    return typeof value === 'object';
}
