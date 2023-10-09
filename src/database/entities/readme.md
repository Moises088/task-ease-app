## Entity Class for Database

This TypeScript code defines a Entity class, representing an entity in the database. It utilizes decorators (`PrimaryGeneratedColumn`, `Column`, and `GenerateCreatedAt`).

### @PrimaryGeneratedColumn
The `PrimaryGeneratedColumn` decorator is used to mark a property as the primary key for the entity. It uses reflection to store the information about the primary generated columns.

### @Column
The `Column` decorator is used to define a regular column for the entity. It allows specifying options such as the data type and default value for the column.
Options: 
- `type`: Specifies the data type of the column, which can be one of the following: "NULL", "INTEGER", "REAL", "TEXT", or "BLOB".
- `default`: Specifies the default value for the column, which can be a string or null.

### @GenerateCreatedAt
The `GenerateCreatedAt` decorator is used to mark a property as the creation timestamp for the entity. It uses reflection to store the information about the created-at columns.