import index from './index';
import Decolize from './lib/Decolize';

describe('index', () => {
    it('exports the Decolize class.', () => {
        expect(index).toBe(Decolize);
    });
});
