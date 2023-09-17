export type FindOptions<Entity> = {
    where?: FindWhere<Entity>,
    select?: Array<keyof Entity>,
    order?: FindOrder<Entity>
}

export type FindOrder<Entity> = {
    [Key in keyof Entity]?: "ASC" | "DESC"

}
export type FindWhere<Entity> = {
    [Key in keyof Entity]?: Entity[Key]
}

export interface RepositoryInterface<Entity> {
    /**
     * Init repository
     */
    init(): Promise<void>

    /**
     * Finds entities in the table based on the provided options.
     * @param options Options for the query.
     * @returns A Promise containing an array of entities.
     */
    find(options?: { where?: FindWhere<Entity>, select?: Array<keyof Entity> }): Promise<Entity[]>;

    /**
     * Saves a new entity to the table.
     * @param data The entity to be saved.
     * @returns A Promise containing the ID of the inserted entity.
     */
    save(data: Entity): Promise<number | undefined>;

    /**
     * Updates an entity in the table based on its ID.
     * @param id The ID of the entity to be updated.
     * @param update An object containing fields and values to be updated.
     * @returns A Promise containing the number of rows affected by the update.
     */
    update(id: number, update: FindWhere<Entity>): Promise<{ rowsAffected: number } | undefined>;

    /**
     * Deletes an entity from the table based on its ID.
     * @param id The ID of the entity to be deleted.
     * @returns A Promise containing the number of rows affected by the deletion.
     */
    delete(id: number): Promise<{ rowsAffected: number } | undefined>;
}
