import Sequelize from 'sequelize';
import * as table from '../helpers/table';

export interface Options {
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

export default function Table(options: Options = {}): ClassDecorator {
    return table.createDecorator(() => options);
}
