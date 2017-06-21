import * as column from '../helpers/column';

export default function GeneratedValue(): PropertyDecorator {
    return column.createDecorator(() => ({
        autoIncrement: true,
    }));
}
