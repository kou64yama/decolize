import 'reflect-metadata';
import Sequelize from 'sequelize';
import { ClassDecorator } from './core';

const metadataKey = Symbol('scope');

export interface ScopeOptions extends Sequelize.DefineScopeOptions {
}

export function getOptions(target: any): ScopeOptions {
    return Reflect.getMetadata(metadataKey, target) as ScopeOptions | undefined || {};
}

export function setOptions(target: any, options: ScopeOptions): void {
    Reflect.defineMetadata(metadataKey, options, target);
}

export function createDecorator(createOptions: (target: any) => ScopeOptions): ClassDecorator {
    return (target: any) => {
        setOptions(target, { ...getOptions(target), ...createOptions(target) });
    };
}
