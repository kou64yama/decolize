import { expect } from 'chai';
import Sequelize from 'sequelize';
import { Column, GeneratedValue, Id, NotEmpty, Table } from './index';
import Repository from './Repository';
import RepositoryFactory from './RepositoryFactory';

@Table()
class Greeting {
    @Column({ type: Sequelize.INTEGER })
    @Id()
    @GeneratedValue()
    public id?: number;

    @Column({ allowNull: false })
    @NotEmpty()
    public message?: string;

    @Column({ allowNull: false })
    public visible: boolean = false;

    public toString(): string {
        return `Greeting (id=${this.id}): ${this.message}`;
    }
}

describe('', () => {
    let repository: Repository<Greeting, string>;
    beforeEach(() => {
        const factory = new RepositoryFactory(new Sequelize('sqlite::memory:'));
        factory.register(Greeting);
        repository = factory.createRepository<Greeting, string>(Greeting);
        return factory.sync();
    });

    it('', async () => {
        const greeting = new Greeting();
        greeting.message = 'Hello World!';
        await repository.save(greeting);
        expect(greeting.id).to.not.equal(undefined);
    });
});
