import Promise from 'bluebird';
import 'reflect-metadata';
import Sequelize from 'sequelize';
import * as column from './helpers/column';
import { entries } from './helpers/core';

const persisted = Symbol('persisted');

export default class Repository<E, T extends number | string> {
    private model: Sequelize.Model<Sequelize.Instance<E>, {}>;
    private EntityClass: new () => E;
    private primaryKeys: string[];

    public constructor(model: Sequelize.Model<Sequelize.Instance<E>, {}>, EntityClass: new () => E) {
        this.model = model;
        this.EntityClass = EntityClass;
        this.primaryKeys = column.getAll(EntityClass.prototype)
            .filter(([, options]) => options.primaryKey)
            .map(([propertyKey]) => propertyKey);
    }

    public save(entity: E): Promise<E> {
        return Reflect.getMetadata(persisted, entity) ? this.update(entity) : this.create(entity);
    }

    public findAll(options?: Sequelize.FindOptions): Promise<E[]> {
        return this.model.findAll(options).map((instance: Sequelize.Instance<E>) => this.createEntity(instance));
    }

    public findById(id: T, options?: Sequelize.FindOptions): Promise<E | null> {
        return this.model.findById(id, options).then((instance) => instance && this.createEntity(instance));
    }

    public findOne(options?: Sequelize.FindOptions): Promise<E | null> {
        return this.model.findOne(options).then((instance) => instance && this.createEntity(instance));
    }

    public remove(id: T): Promise<void> {
        return this.model.destroy({ where: { [this.primaryKeys[0]]: id } }).then(() => {});
    }

    private update(entity: E): Promise<E> {
        const id = this.getId(entity);
        return this.model.update(entity, { where: id }).then(() => entity);
    }

    private create(entity: E): Promise<E> {
        return this.model.create(entity).then((instance) => {
            Reflect.defineMetadata(persisted, true, entity);
            return this.createEntity(instance, entity);
        });
    }

    private getId(entity: E): {} {
        return this.primaryKeys.reduce((mem, key) => ({
            ...mem,
            [key]: (entity as any)[key],
        }), {});
    }

    private createEntity(instance: Sequelize.Instance<E>, entity = new this.EntityClass()): E {
        for (const [key, value] of entries(instance.get({ plain: true }))) {
            (entity as any)[key] = value;
        }
        return entity;
    }
}
