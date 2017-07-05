# Decolize

[![Build Status](https://travis-ci.org/kou64yama/decolize.svg?branch=master)](https://travis-ci.org/kou64yama/decolize)
[![codecov](https://codecov.io/gh/kou64yama/decolize/branch/master/graph/badge.svg)](https://codecov.io/gh/kou64yama/decolize)
[![Coverage Status](https://coveralls.io/repos/github/kou64yama/decolize/badge.svg)](https://coveralls.io/github/kou64yama/decolize)
[![license](https://img.shields.io/github/license/kou64yama/decolize.svg)](./LICENSE)

**Note: Decolize is under development. It can not be used yet.**

Decolize is the decorator-driven O/R mapper for TypeScript (Node.js).

## Getting Started

### Installation

```sh
npm install -S decolize
```

### Usage

To use decolize, set `experimentalDecorators` and `emitDecoratorMetadata` to true:

```json
{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

For example:

```ts
import * as Sequelize from 'sequelize';
import Decolize from 'decolize';
import { Table, Id, GeneratedValue, Column } from 'decolize/persistences';
import { NotEmpty, Len } from 'decolize/validators';

// CREATE TABLE greeting (...);
@Table()
class Greeting {
    // id INTEGER PRIMARY KEY
    @Id()
    @GeneratedValue()
    public id?: number;

    // message VARCHAR(255) NOT NULL
    @Column({ allowNull: false })
    @NotEmpty()
    @Len({ max: 100 })
    public message?: string;

    public toString(): string {
        return `${this.id}: ${this.message}`;
    }
}

const sequelize = new Sequelize('sqlite::memory:');
const decolize = new Decolize(sequelize);
decolize.register(Greeting);

const greetingRepository = decolize.createRepository<Greeting, number>(Greeting);

sequelize.sync().then(async () => {
    const greeting = new Greeting();
    greeting.message = 'Hello World!';

    // INSERT INTO greeting (message) VALUES ('Hello World!');
    await greetingRepository.save(greeting);
    console.log(`${greeting}`);

    greeting.message = 'Hello Data World!';
    // UPDATE greeting SET message = 'Hello Data World!' WHERE id = 1;
    await greetingRepository.save(greeting);
    console.log(`${greeting}`);

    const greetings = ['message 1', 'message 2'].map((message) => {
        const g = new Greeting();
        g.message = message;
        return g;
    });
    // INSERT INTO greeting (message) VALUES ('message 1'), ('mssage 2');
    greetingRepository.save(greetings);
});
```

## License

[MIT](./LICENSE) License

## Author

[YAMADA Koji](https://github.com/kou64yama)
