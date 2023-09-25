import { Column, GenerateCreatedAt, PrimaryGeneratedColumn } from "../../decorators/database.decorator";

export class TaskItemEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "TEXT", default: "" })
    title!: string;

    @Column({ type: "INTEGER", default: "" })
    taskId!: number;

    @Column({ type: "TEXT", default: "check" })
    type!: "check" | "list" | "list-ol"

    @Column({ type: "TEXT", default: "" })
    description?: string;

    @Column({ type: "INTEGER", default: "" })
    checked?: boolean;

    @GenerateCreatedAt()
    createdAt?: number;
}