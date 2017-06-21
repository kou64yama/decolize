import Sequelize from 'sequelize';
import * as column from '../helpers/column';

export interface Options {
    type?: string | Sequelize.DataTypeAbstract;
    allowNull?: boolean;
    defaultValue?: any;
    unique?: boolean;
    field?: string;
    comment?: string;
}

export default function Column({ type, ...options }: Options = {}): PropertyDecorator {
    return column.createDecorator((target, propertyKey) => ({
        ...options,
        type: type || column.getType(target, propertyKey),
    }));
}
