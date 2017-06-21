import { expect } from 'chai';
import * as column from '../helpers/column';
import GeneratedValue from './GeneratedValue';

describe('@GeneratedValue(options)', () => {
    class Greeting {
        @GeneratedValue()
        public id: string;
    }

    it('grants the primaryKey option and set to true.', () => {
        expect(column.getOptions(Greeting, 'id'))
            .to.have.property('autoIncrement')
            .and.be.true;
    });
});
