import Sequelize from 'sequelize';
import * as scope from '../helpers/scope';

export default function Scope(name: string, options: Sequelize.FindOptions): ClassDecorator {
    return scope.createDecorator(() => ({ [name]: options }));
}
