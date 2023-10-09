import { TaskItemEntity } from "../database/entities/task-item.entity";
import { TaskEntity } from "../database/entities/task.entity";
import { TaskItemRepository } from "../database/repositories/task-item.repository";
import { TaskRepository } from "../database/repositories/task.repository";
import { FindOptions, FindWhere } from "../interfaces/database/repository.interface";
import { TaskItem } from "../interfaces/screens/task.interface";

class TaskCls {

    public async create(task: TaskEntity) {
        const startTime = Date.now();
        const taskRepository = new TaskRepository();
        const response = await taskRepository.save(task);
        return this.ensureMinimumDelay<number | undefined>(startTime, 10, response);
    }

    public async find(options?: FindOptions<TaskEntity>) {
        const startTime = Date.now();
        const taskRepository = new TaskRepository()
        const response = await taskRepository.find(options);
        return this.ensureMinimumDelay<TaskEntity[]>(startTime, 10, response);
    }

    public async findItens(id: number) {
        const startTime = Date.now();
        const taskItemRepository = new TaskItemRepository()
        const response = await taskItemRepository.find({ where: { taskId: id } });
        return this.ensureMinimumDelay<TaskItemEntity[]>(startTime, 10, response);
    }

    public async syncItens(modifiedItems: (TaskItemEntity & { index: number })[], createdItems: (TaskItemEntity & { index: number })[]) {
        const taskItemRepository = new TaskItemRepository();
        const response: { created: (TaskItemEntity & { index: number })[], updated: number[] } = {
            created: [],
            updated: []
        };

        for (const modifiedItem of modifiedItems) {
            if (modifiedItem.id) {
                const updated = await taskItemRepository.update(modifiedItem.id, {
                    checked: modifiedItem.checked,
                    description: modifiedItem.description,
                    taskId: modifiedItem.taskId,
                    title: modifiedItem.title,
                    type: modifiedItem.type,
                });
                if (updated?.rowsAffected) response.updated.push(updated?.rowsAffected)
            }
        }

        for (const createdItem of createdItems) {
            const created = await taskItemRepository.save({
                taskId: createdItem.taskId,
                title: createdItem.title,
                type: createdItem.type,
                checked: createdItem.checked,
                description: createdItem.description,
            })
            response.created.push({ id: created, ...createdItem })
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