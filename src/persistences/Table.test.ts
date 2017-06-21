import { expect } from 'chai';
import * as table from '../helpers/table';
import Table from './Table';

describe('@Table(options)', () => {
    const options = { name: 'greeting' };

    @Table(options)
    class Greeting {
    }

    it('grants the table options.', () => {
        expect(table.getOptions(Greeting)).to.deep.equal(options);
    });
});
