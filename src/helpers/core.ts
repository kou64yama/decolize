import Sequelize from 'sequelize';

export interface Class<T> {
    new (): T;
}

export type ClassDecorator = (target: any) => void;
export type PropertyDecorator = (target: any, propertyKey: string) => void;

export type Model<T> = Sequelize.Model<Sequelize.Instance<T> & T, T>;

export function entries(obj: any): Array<[string, any]> {
    if (obj === null || obj === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    const entries: Array<[string, any]> = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            entries.push([key, obj[key]]);
        }
    }
    return entries;
}
