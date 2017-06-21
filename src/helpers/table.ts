import 'reflect-metadata';
import Sequelize from 'sequelize';
import { ClassDecorator } from './core';

const metadataKey = Symbol('table');

export interface TableOptions {
    defaultScope?: Sequelize.FindOptions;
    timestamps?: boolean;
    paranoid?: boolean;
    underscored?: boolean;
    underscoredAll?: boolean;
    freezeTableName?: boolean;
    name?: Sequelize.DefineNameOptions;
    indexes?: Sequelize.DefineIndexesOptions[];
    createdAt?: string | boolean;
    updatedAt?: string | boolean;
    deletedAt?: string | boolean;
    tableName?: string;
    schema?: string;
    engine?: string;
    charset?: string;
    comment?: string;
    collate?: string;
    initialAutoIncrement?: string;
}

export function getOptions(target: any): TableOptions {
    return Reflect.getMetadata(metadataKey, target) as TableOptions | undefined || {};
}

export function setOptions(target: any, options: TableOptions): void {
    Reflect.defineMetadata(metadataKey, options, target);
}

export function createDecorator(createOptions: (target: any) => TableOptions): ClassDecorator {
    return (target) => setOptions(target, { ...getOptions(target), ...createOptions(target) });
}
