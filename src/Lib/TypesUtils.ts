export const isString = (maybeString: unknown): maybeString is string => {
    return typeof maybeString === 'string';
}

export const isObject = (value: unknown): value is object => {
    return typeof value === 'object' && value !== null;
}

export const isRecord = <K extends string | number | symbol, V>(value: unknown): value is Record<K, V> => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
