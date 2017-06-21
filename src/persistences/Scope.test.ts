import { expect } from 'chai';
import * as scope from '../helpers/scope';
import Scope from './Scope';

describe('@Scope(options)', () => {
    const options = { where: { foo: 'bar'} };

    @Scope('fooIsBar', options)
    class Greeting {
    }

    it('grants the default scope options.', () => {
        expect(scope.getOptions(Greeting)).to.has.property('fooIsBar')
            .and.deep.equal(options);
    });
});
