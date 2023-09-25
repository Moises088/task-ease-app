import { TaskItemEntity } from "../entities/task-item.entity";
import { Repository } from "../repository";

export class TaskItemRepository extends Repository<TaskItemEntity> {
    constructor() {
        super(TaskItemEntity);
    }
}