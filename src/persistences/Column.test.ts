/* tslint:disable max-classes-per-file */

import { expect } from 'chai';
import Sequelize from 'sequelize';
import * as column from '../helpers/column';
import Column from './Column';

describe('@Column(options)', () => {
    context('if the "type" property is specified', () => {
        class Greeting {
            @Column({ comment: 'The greeting message' })
            public message: string;
        }

        it('grants the column options.', () => {
            expect(column.getOptions(Greeting, 'message'))
                .to.have.property('comment')
                .and.equal('The greeting message');
        });
    });

    context('if the "type" property is not specified', () => {
        class Greeting {
            @Column({ comment: 'The greeting message' })
            public message: string;
        }

        it('determines the type.', () => {
            expect(column.getOptions(Greeting, 'message'))
                .to.have.property('type')
                .and.deep.equal(Sequelize.STRING);
        });
    });
});
