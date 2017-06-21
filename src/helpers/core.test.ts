import { expect } from 'chai';
import { entries } from './core';

describe('entries(obj)', () => {
    context('if the obj is undefined or null', () => {
        it('throws a TypeError, with message "Cannot convert undefined or null to object"', () => {
            const message = 'Cannot convert undefined or null to object';
            expect(() => entries(undefined)).to.throw(TypeError, message);
            expect(() => entries(null)).to.throw(TypeError, message);
        });
    });

    context('if the obj is the plain object', () => {
        const obj = {
            foo: 1,
            bar: '2',
            baz: true,
        };

        it('returns the key-value pairs', () => {
            const keys: string[] = [];
            const values: any[] = [];
            entries(obj).forEach(([key, value]) => {
                keys.push(key);
                values.push(value);
            });
            expect(keys.sort()).to.deep.equal(['foo', 'bar', 'baz'].sort());
            expect(values.sort()).to.deep.equal([1, '2', true].sort());
        });
    });
});
