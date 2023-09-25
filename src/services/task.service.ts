import { TaskItemEntity } from "../database/entities/task-item.entity";
import { TaskEntity } from "../database/entities/task.entity";
import { TaskItemRepository } from "../database/repositories/task-item.repository";
import { TaskRepository } from "../database/repositories/task.repository";
import { FindOptions, FindWhere } from "../interfaces/database/repository.interface";
import { TaskItem } from "../interfaces/screens/task.interface";

class TaskCls {

    public async create(task: TaskEntity) {
        console.log("task", task)
        const startTime = Date.now();
        const taskRepository = new TaskRepository();
        const response = await taskRepository.save(task);
        return this.ensureMinimumDelay<number | undefined>(startTime, 30, response);
    }

    public async find(options?: FindOptions<TaskEntity>) {
        console.log("options", options)
        const startTime = Date.now();
        const taskRepository = new TaskRepository()
        const response = await taskRepository.find(options);
        return this.ensureMinimumDelay<TaskEntity[]>(startTime, 30, response);
    }

    public async findItens(id: number) {
        const startTime = Date.now();
        const taskItemRepository = new TaskItemRepository()
        const response = await taskItemRepository.find({ where: { taskId: id } });
        return this.ensureMinimumDelay<TaskItemEntity[]>(startTime, 30, response);
    }

    public async syncItens(modifiedItems: TaskItemEntity[], createdItems: TaskItemEntity[]) {
        const taskItemRepository = new TaskItemRepository();
        const response = [];

        for (const modifiedItem of modifiedItems) {
            if (modifiedItem.id) {
                const updated = await taskItemRepository.update(modifiedItem.id, modifiedItem);
                response.push(updated)
            }
        }

        for (const createdItem of createdItems) {
            const created = await taskItemRepository.save(createdItem)
            response.push(created)
        }

        return response
    }

    protected async ensureMinimumDelay<T>(startTime: number, minDelay: number, response: T) {
        const endTime = Date.now();
        const executionTime = endTime - startTime;

        if (executionTime < minDelay) {
            await this.delay(minDelay - executionTime);
        }

        return response;
    };

    protected delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
}

export const Task = new TaskCls()