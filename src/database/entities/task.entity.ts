import { Column, GenerateCreatedAt, PrimaryGeneratedColumn } from "../../decorators/database.decorator";

export class TaskEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "TEXT", default: "" })
    title!: string;

    @Column({ type: "INTEGER", default: null })
    coverId?: number;

    @Column({ type: "TEXT", default: "none" })
    type!: "none" | "task" | "book" | "shopping" | "movie" | "desire" | "travel" | "gift";

    @GenerateCreatedAt()
    createdAt?: number;
}