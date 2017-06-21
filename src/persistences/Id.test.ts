import { expect } from 'chai';
import * as column from '../helpers/column';
import Id from './Id';

describe('@Id(options)', () => {
    class Greeting {
        @Id()
        public id: string;
    }

    it('grants the primaryKey option and set to true.', () => {
        expect(column.getOptions(Greeting, 'id'))
            .to.have.property('primaryKey')
            .and.be.true;
    });
});
