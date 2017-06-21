import 'reflect-metadata';
import Sequelize from 'sequelize';
import { PropertyDecorator } from './core';

const metadataKey = Symbol('column');

export interface ColumnOptions {
    type?: string | Sequelize.DataTypeAbstract;
    allowNull?: boolean;
    defaultValue?: any;
    unique?: boolean;
    primaryKey?: boolean;
    field?: string;
    autoIncrement?: boolean;
    comment?: string;
}

export function getAll(target: any): Array<[string, ColumnOptions]> {
    const columns = Reflect.getMetadata(metadataKey, target) as Set<string> | undefined;
    if (!columns) {
        return [];
    }

    return [...columns].map<[string, ColumnOptions]>((propertyKey) => [propertyKey, getOptions(target, propertyKey)]);
}

export function getOptions(target: any, propertyKey: string): ColumnOptions {
    return Reflect.getMetadata(metadataKey, target, propertyKey) as ColumnOptions | undefined || {};
}

export function setOptions(target: any, propertyKey: string, options: ColumnOptions): void {
    Reflect.defineMetadata(metadataKey, options, target, propertyKey);

    let columns = Reflect.getMetadata(metadataKey, target) as Set<string> | undefined;
    if (!columns) {
        columns = new Set<string>();
        Reflect.defineMetadata(metadataKey, columns, target);
    }
    columns.add(propertyKey);
}

export function createDecorator(
    createOptions: (target: any, propertyKey: string) => ColumnOptions,
): PropertyDecorator {
    return (target: any, propertyKey: string) => {
        const options = { ...getOptions(target.constructor, propertyKey), ...createOptions(target, propertyKey) };
        setOptions(target.constructor, propertyKey, options);
    };
}

export function getType(target: any, propertyKey: string): Sequelize.DataTypeAbstract {
    const type = Reflect.getMetadata('design:type', target, propertyKey);
    switch (type) {
        case String:
            return Sequelize.STRING;
        case Number:
            return Sequelize.NUMBER;
        case Boolean:
            return Sequelize.BOOLEAN;
        case Date:
            return Sequelize.DATE;
        default:
            return Sequelize.BLOB;
    }
}
