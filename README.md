# Decolize

Decolize is the decorator-driven O/R mapper.

## Getting Started

### Installation

```sh
npm install -S https://github.com/kou64yama/decolize.git#master
```

### Usage

```json
{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
    }
}
```

```ts
import * as Sequelize from 'sequelize';
import { Column, GeneratedValue, Id, RepositoryFactory, Table } from 'decolize';

@Table()
class Greeting {
    @Id()
    @GeneratedValue()
    public id?: number;

    @Column()
    public message?: string;
}

const sequelize = new Sequelize('sqlite::memory:');
const factory = new RepositoryFactory(sequelize);
factory.register(Greeting);

const greetingRepository = factory.createRepository<Greeting, number>(Greeting);

factory.sync(async () => {
    const greeting = new Greeting();
    greeting.message = 'Hello World!';
    await greetingRepository.save(greeting);
    console.log(`${greeting.id}: ${greeting.message}`);
});

```

## License

MIT License

## Author

[YAMADA Koji](https://github.com/kou64yama)
