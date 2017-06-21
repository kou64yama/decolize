import { expect } from 'chai';
import Sequelize from 'sequelize';
import Repository from './Repository';

class Greeting {
    public id?: string;
    public message?: string;
}

describe('Repository', () => {
    let greetingRepository: Repository<Greeting, string>;

    beforeEach(() => {
        const sequelize = new Sequelize('sqlite::memory:');
        const Model = sequelize.define<Sequelize.Instance<{}>, {}>('greeting', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            message: {
                type: Sequelize.STRING(255),
            },
        });
        greetingRepository = new Repository<Greeting, string>(Model, Greeting);
        return sequelize.sync();
    });

    describe('#save()', () => {
        it('persists the entity.', async () => {
            const greeting = new Greeting();
            greeting.message = 'message';
            await greetingRepository.save(greeting);
            expect(greeting).to.have.property('id').and.match(/^[0-9a-f\-]*$/);
        });
    });

    describe('#findAll()', () => {
        beforeEach(async () => {
            const first = new Greeting();
            first.message = 'First message';
            await greetingRepository.save(first);

            const second = new Greeting();
            second.message = 'Second message';
            await greetingRepository.save(second);
        });

        it('returns some entities.', async () => {
            const all = await greetingRepository.findAll();
            expect(all).to.length(2);
        });
    });
});
