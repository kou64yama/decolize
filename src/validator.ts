import * as validate from './helpers/validate';

type StringOrRegExp = string | RegExp;

const v = <T>(args: T, msg?: string) => msg === undefined ? args : { args, msg };

export const Is = (regexp: StringOrRegExp | StringOrRegExp[], msg?: string) => validate.createDecorator(() => ({
    is: v(regexp, msg),
}));

export const Not = (regexp: StringOrRegExp | StringOrRegExp[], msg?: string) => validate.createDecorator(() => ({
    not: v(regexp, msg),
}));

export const Email = (msg?: string) => validate.createDecorator(() => ({
    isEmail: v(true, msg),
}));

export const URL = (msg?: string) => validate.createDecorator(() => ({
    isUrl: v(true, msg),
}));

export const IP = (msg?: string) => validate.createDecorator(() => ({
    isIP: v(true, msg),
}));

export const IPv4 = (msg?: string) => validate.createDecorator(() => ({
    isIPv4: v(true, msg),
}));

export const IPv6 = (msg?: string) => validate.createDecorator(() => ({
    isIPv6: v(true, msg),
}));

export const Alpha = (msg?: string) => validate.createDecorator(() => ({
    isAlpha: v(true, msg),
}));

export const Alphanumeric = (msg?: string) => validate.createDecorator(() => ({
    isAlphanumeric: v(true, msg),
}));

export const Numeric = (msg?: string) => validate.createDecorator(() => ({
    isNumeric: v(true, msg),
}));

export const Int = (msg?: string) => validate.createDecorator(() => ({
    isInt: v(true, msg),
}));

export const Float = (msg?: string) => validate.createDecorator(() => ({
    isFloat: v(true, msg),
}));

export const Decimal = (msg?: string) => validate.createDecorator(() => ({
    isDecimal: v(true, msg),
}));

export const Lowercase = (msg?: string) => validate.createDecorator(() => ({
    isLowercase: v(true, msg),
}));

export const Uppercase = (msg?: string) => validate.createDecorator(() => ({
    isUppercase: v(true, msg),
}));

export const Null = (msg?: string) => validate.createDecorator(() => ({
    isNull: v(true, msg),
}));

export const NotEmpty = (msg?: string) => validate.createDecorator(() => ({
    notEmpty: v(true, msg),
}));

export const Equals = (value: string, msg?: string) => validate.createDecorator(() => ({
    equals: v(value, msg),
}));

export const Contains = (substring: string, msg?: string) => validate.createDecorator(() => ({
    contains: v(substring, msg),
}));

export const NotIn = (values: string[][], msg?: string) => validate.createDecorator(() => ({
    notIn: v(values, msg),
}));

export const In = (values: string[][], msg?: string) => validate.createDecorator(() => ({
    isIn: v(values, msg),
}));

export const NotContains = (substring: string, msg?: string) => validate.createDecorator(() => ({
    notContains: v(substring, msg),
}));

export const Length = (len: [number, number], msg?: string) => validate.createDecorator(() => ({
    len: v(len, msg),
}));

export const UUID = (version: number, msg?: string) => validate.createDecorator(() => ({
    isUUID: v(version, msg),
}));

export const Date = (msg?: string) => validate.createDecorator(() => ({
    isDate: v(true, msg),
}));

export const After = (date: string, msg?: string) => validate.createDecorator(() => ({
    isAfter: v(date, msg),
}));

export const Before = (date: string, msg?: string) => validate.createDecorator(() => ({
    isBefore: v(date, msg),
}));

export const Max = (max: number, msg?: string) => validate.createDecorator(() => ({
    max: v(max, msg),
}));

export const Min = (min: number, msg?: string) => validate.createDecorator(() => ({
    min: v(min, msg),
}));

export const CreditCard = (msg?: string) => validate.createDecorator(() => ({
    isCreditCard: v(true, msg),
}));
