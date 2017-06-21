import Bluebird from 'bluebird';
import 'reflect-metadata';
import Sequelize from 'sequelize';
import * as column from './helpers/column';
import * as scope from './helpers/scope';
import * as table from './helpers/table';
import * as validate from './helpers/validate';
import Repository from './Repository';

export default class RepositoryFactory {
    private sequelize: Sequelize.Sequelize;
    private entities = new Set<new () => any>();
    private models = new Map<new () => any, Sequelize.Model<any, {}>>();

    public constructor(sequelize: Sequelize.Sequelize) {
        this.sequelize = sequelize;
    }

    public sync(options: Sequelize.SyncOptions = {}): Bluebird<any> {
        return this.sequelize.sync(options);
    }

    public register<E>(entityClass: new () => E): void {
        this.entities.add(entityClass);
    }

    public createRepository<E, T extends string | number>(EntityClass: new () => E): Repository<E, T> {
        const model = this.getModel(EntityClass);
        return new Repository(model, EntityClass);
    }

    private getModel<E>(EntityClass: new () => E): Sequelize.Model<Sequelize.Instance<E>, {}> {
        if (this.models.has(EntityClass)) {
            return this.models.get(EntityClass) as Sequelize.Model<Sequelize.Instance<E>, {}>;
        }

        const columns = column.getAll(EntityClass)
            .reduce<Sequelize.DefineAttributes>((prev, [propertyKey, { type, ...options }]) => {
                if (!type) {
                    throw new Error('Fatal error');
                }

                return {
                    ...prev,
                    [propertyKey]: {
                        ...options,
                        type,
                        validate: validate.getOptions(EntityClass.prototype, propertyKey),
                    },
                };
            }, {});

        const options = table.getOptions(EntityClass);
        const scopes = scope.getOptions(EntityClass);

        const model = this.sequelize.define<Sequelize.Instance<E>, {}>(EntityClass.name, columns, {
            ...options,
            scopes,
        });

        this.models.set(EntityClass, model);

        return model;
    }
}
