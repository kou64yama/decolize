import * as column from '../helpers/column';

export default function Id(): PropertyDecorator {
    return column.createDecorator(() => ({
        primaryKey: true,
    }));
}
