import 'reflect-metadata';

const primaryGeneratedColumnsMetadataKey = Symbol('primaryGeneratedColumns');

export interface ColumnOptions {
    type: "NULL" | "INTEGER" | "REAL" | "TEXT" | "BLOB";
    default: string | null;
}

export function PrimaryGeneratedColumn(): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol) => {
        const existingColumns = Reflect.getMetadata(primaryGeneratedColumnsMetadataKey, target.constructor) || [];
        existingColumns.push(propertyKey);
        Reflect.defineMetadata(primaryGeneratedColumnsMetadataKey, existingColumns, target.constructor);
    };
}

export function getPrimaryGeneratedColumns(target: Function): string[] {
    return Reflect.getMetadata(primaryGeneratedColumnsMetadataKey, target) || [];
}

const columnsMetadataKey = Symbol('columns');

export function Column(options: ColumnOptions): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol) => {
        const existingColumns = Reflect.getMetadata(columnsMetadataKey, target.constructor) || {};
        existingColumns[propertyKey as string] = options;

        Reflect.defineMetadata(columnsMetadataKey, existingColumns, target.constructor);
    };
}

export function getColumns(target: Object): Record<string, ColumnOptions> {
    return Reflect.getMetadata(columnsMetadataKey, target) || {};
}

const createdAtMetadataKey = Symbol('createdAt');

export function GenerateCreatedAt(): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol) => {
        const existingColumns = Reflect.getMetadata(createdAtMetadataKey, target.constructor) || [];
        existingColumns.push(propertyKey);
        Reflect.defineMetadata(createdAtMetadataKey, existingColumns, target.constructor);
    };
}

export function getGenerateCreatedAt(target: Function): string[] {
    return Reflect.getMetadata(createdAtMetadataKey, target) || [];
}