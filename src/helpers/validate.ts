import 'reflect-metadata';
import Sequelize from 'sequelize';
import { PropertyDecorator } from './core';

const metadataKey = Symbol('validate');

export function getOptions(target: any, propertyKey: string): Sequelize.DefineValidateOptions {
    return Reflect.getMetadata(metadataKey, target, propertyKey) as Sequelize.DefineValidateOptions | undefined || {};
}

export function setOptions(target: any, propertyKey: string, options: Sequelize.DefineValidateOptions): void {
    Reflect.defineMetadata(metadataKey, options, target, propertyKey);
}

export function createDecorator(
    createOptions: (target: any, propertyKey: string) => Sequelize.DefineValidateOptions,
): PropertyDecorator {
    return (target, propertyKey) => setOptions(target, propertyKey, {
        ...getOptions(target, propertyKey),
        ...createOptions(target, propertyKey),
    });
}
