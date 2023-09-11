import { TaskEntity } from "../entities/task.entity";
import { Repository } from "../repository";

export class TaskRepository extends Repository<TaskEntity> {
    constructor() {
        super(TaskEntity);
    }
}