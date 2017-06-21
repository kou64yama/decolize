import { expect } from 'chai';
import * as table from '../helpers/table';
import DefaultScope from './DefaultScope';

describe('@DefaultScope(options)', () => {
    const scope = { where: { foo: 'bar'} };

    @DefaultScope(scope)
    class Greeting {
    }

    it('grants the default scope options.', () => {
        expect(table.getOptions(Greeting)).to.has.property('defaultScope')
            .and.deep.equal(scope);
    });
});
