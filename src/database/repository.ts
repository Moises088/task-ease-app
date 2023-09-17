import { ColumnOptions, getColumns, getGenerateCreatedAt, getPrimaryGeneratedColumns } from "../decorators/database.decorator";
import * as SQLite from 'expo-sqlite';
import { FindOptions, RepositoryInterface } from "../interfaces/database/repository.interface";
import { DatabaseSettings } from "../constants/database";

const db = SQLite.openDatabase(DatabaseSettings.name + '.db');

export class Repository<Entity> implements RepositoryInterface<Entity> {
    protected entity: new () => Entity;
    protected tableName!: string;
    protected exists: boolean = false;

    constructor(entity: new () => Entity) {
        this.entity = entity;
        const tableName = entity.name.replace("Entity", "").toLowerCase();
        this.tableName = tableName;
    }

    async init(): Promise<void> {
        if (this.exists) return

        const tableName = this.tableName;

        const columns = getColumns(this.entity)
        const primaryGenerates = getPrimaryGeneratedColumns(this.entity);
        const createdAtColumns = getGenerateCreatedAt(this.entity)

        const tableExist = await new Promise<boolean>((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
                    [tableName],
                    (_, resultado) => {
                        if (resultado.rows.length > 0) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    },
                    (_, erro) => {
                        reject(erro);
                        return false;
                    }
                );
            });
        });

        if (tableExist) return this.updateTable(tableName, this.entity)

        if (Object.keys(columns)?.length && primaryGenerates?.length) {
            await this.createTable(primaryGenerates, columns, tableName, createdAtColumns)
        }
    }

    protected getDefault(defaultValue: string | null, type: "NULL" | "INTEGER" | "REAL" | "TEXT" | "BLOB") {
        if (!defaultValue) return "NULL";

        if (type == "TEXT") return `'${defaultValue}'`;

        return defaultValue
    }

    protected createTable(primaryGenerates: string[], columns: Record<string, ColumnOptions>, tableName: string, createdAtColumns: string[]) {
        const ids = [];
        const column = []

        for (const primaryGenerate of primaryGenerates) {
            ids.push(`${primaryGenerate} INTEGER PRIMARY KEY NOT NULL`)
        }

        for (const createdAtColumn of createdAtColumns) {
            column.push(`${createdAtColumn} INTEGER DEFAULT NULL`)
        }

        for (const key in columns) {
            if (Object.prototype.hasOwnProperty.call(columns, key)) {
                const c = columns[key];
                column.push(`${key} ${c.type} DEFAULT ${this.getDefault(c.default, c.type)}`)
            }
        }

        const tableColumns = [...ids, ...column]

        const query = `
            CREATE TABLE IF NOT EXISTS ${tableName}
            (${tableColumns.join(",")})
        `;

        db.transaction(tx => {
            tx.executeSql(query);
        });

        this.exists = true;
    }

    protected async updateTable(tableName: string, entity: new () => Entity) {
        const query = `PRAGMA table_info(${tableName});`;

        const tableColumns = await new Promise<string[]>(resolve => {
            db.transaction(tx => {
                tx.executeSql(query, [], (_, result) => {
                    const columns = result.rows._array.map(row => row.name);
                    resolve(columns)
                });
            });
        })

        const entityColumns = []
        const entityObj = new this.entity();

        for (const key in entityObj) {
            entityColumns.push(key)
        }

        const missingElements = entityColumns.filter(item => !tableColumns.includes(item)) as string[];
        const columns = getColumns(entity)
        const createdAtColumns = getGenerateCreatedAt(entity)
        const updateColumns: any[] = []

        for (const key in columns) {
            const column = columns[key];
            const update = missingElements.includes(key)
            if (update) {
                updateColumns.push(`ADD COLUMN ${key} ${column.type} DEFAULT ${this.getDefault(column.default, column.type)}`)
            }
        }

        for (const createdAtColumn of createdAtColumns) {
            const update = missingElements.includes(createdAtColumn)
            if (update) {
                updateColumns.push(`ADD COLUMN ${createdAtColumn} INTEGER DEFAULT NULL`)
            }
        }

        if (updateColumns?.length) {

            db.transaction(tx => {
                for (const q of updateColumns) {
                    tx.executeSql(
                        `ALTER TABLE ${tableName} ${q}`,
                        [],
                        (_, result) => { },
                        (_, { code, message }) => {
                            return false
                        }
                    );
                }
            })
        }

        this.exists = true;

        return
    }

    protected generateQueryWhere(params?: FindOptions<Entity>): { where: string, value: (string | number)[] } {
        if (!params) return { where: "", value: [] };

        const columnNames = []
        const values: (string | number)[] = []

        for (const column in params) {
            const key = column as keyof Entity;
            const param = params[key] as string | number;

            columnNames.push(`${column} = ?`)
            values.push(param)
        }

        if (!columnNames?.length) return { where: "", value: [] };

        return { where: "where " + columnNames.join(" and "), value: values }
    }

    public find(options?: { where?: FindOptions<Entity>, select?: Array<keyof Entity> }): Promise<Entity[]> {
        if (!this.tableName) throw new Error("Repository not initiated")

        const find = this.generateQueryWhere(options?.where);
        const select = options?.select?.join(",") ?? "*";
        const query = `SELECT ${select} FROM ${this.tableName} ${find.where};`;

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    query,
                    find.value,
                    (_, { rows }) => {
                        const data = rows._array.map(row => row) as Entity[];
                        resolve(data ?? [])
                    },
                    (_, { message }) => {
                        reject(message)
                        return false
                    }
                );
            })
        })
    }

    public async save(data: Entity): Promise<number | undefined> {
        if (!this.tableName) throw new Error("Repository not initiated")

        const table = this.entity;
        const getTable = new table() as Object;
        const columns = Object.keys(getTable);
        const primaryGenerates = getPrimaryGeneratedColumns(table)
        const generateCreatedAt = getGenerateCreatedAt(table)

        const values = columns.map((column) => {
            if (!primaryGenerates.includes(column)) {
                const key = column as keyof Entity;

                if (generateCreatedAt.includes(column)) {
                    return { column: key, value: Date.now() };
                }
                return { column: key, value: data[key] };
            }
        }).filter(r => r?.value) as { column: string, value: (string | number) }[];

        const columnNames = values.map(v => v.column)
        const placeholders = Array(values.length).fill('?').join(', ');

        const query = `
            INSERT INTO ${this.tableName} (${columnNames.join(', ')})
            VALUES (${placeholders});
        `;

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    query,
                    values.map(v => v.value),
                    (_, { insertId }) => {
                        resolve(insertId)
                    },
                    (_, { message }) => {
                        reject(message)
                        return false
                    }
                );
            })
        })
    }

    public async update(id: number, update: FindOptions<Entity>): Promise<{ rowsAffected: number } | undefined> {
        if (!this.tableName) throw new Error("Repository not initiated")

        const table = this.entity as Function;
        const primaryGenerates = getPrimaryGeneratedColumns(table)

        const columnNames = []
        const columValues: any[] = []

        for (const column in update) {
            if (!primaryGenerates.includes(column)) {
                const key = column as keyof Entity;
                const param = update[key] as string | number;

                columnNames.push(`${column} = ?`)
                columValues.push(param)
            }
        }

        if (columnNames?.length) {
            const query = `
                UPDATE ${this.tableName} 
                SET ${columnNames.join(', ')}
                WHERE id = ?;
            `;

            return new Promise((resolve, reject) => {
                db.transaction(tx => {
                    tx.executeSql(
                        query,
                        [...columValues, id],
                        (_, { rowsAffected }) => {
                            resolve({ rowsAffected })
                        },
                        (_, { message }) => {
                            reject(message)
                            return false
                        }
                    );
                })
            })
        }
    }

    public async delete(id: number): Promise<{ rowsAffected: number } | undefined> {
        if (!this.tableName) throw new Error("Repository not initiated")

        const query = `
            DELETE FROM  ${this.tableName} 
            WHERE id = ?;
        `;

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    query,
                    [id],
                    (_, { rowsAffected }) => {
                        resolve({ rowsAffected })
                    },
                    (_, { message }) => {
                        reject(message)
                        return false
                    }
                );
            })
        })
    }
}