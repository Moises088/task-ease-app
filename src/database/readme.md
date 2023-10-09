## Repository Class for Database Interaction

This TypeScript code defines a generic repository class (Repository) that facilitates interactions with a SQLite database in a mobile application, using the Expo SQLite library. 

## Initialization

The `init()` function, check if the table [entity](/src/database/entities/readme.md) exists, if it exists, then validate that all columns exist, then update the table. If it does not exist, create a new table with the name of the [entity](/src/database/entities/readme.md) and all the entity's columns.

To ensure the table is initialized in the database, somewhere you need to start the repository. In my case I start in my [context](/src/contexts/readme.md).

```
const repository = new Repository<MyEntityClass>(MyEntityClass);
await repository.init();
```

## Find

Use the find method to retrieve records from the database based on specified [options](/src/interfaces/database/repository.interface.ts).

```
const options: FindOptions<MyEntityClass> = { where: { column: 'value' } };
const result = await repository.find(options);
```

## Save

To insert a new record into the database, use the save method.

```
const newRecord: MyEntityClass = { ... }; // Initialize with data
const insertedId = await repository.save(newRecord);
```

## Update

Update existing records using the update method. You need the `id` the [entity](/src/database/entities/readme.md) and the `columns` to update.

```
const updateParams: FindWhere<MyEntityClass> = { column: 'new value' };
const updateResult = await repository.update(recordId, updateParams);
```

## Delete

Delete records from the database using the delete method. You need the `id` the [entity](/src/database/entities/readme.md).

```
const deleteResult = await repository.delete(recordId);
```