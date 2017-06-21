import Sequelize from 'sequelize';
import * as table from '../helpers/table';

export default function DefaultScope(defaultScope: Sequelize.FindOptions): ClassDecorator {
    return table.createDecorator(() => ({ defaultScope }));
}
