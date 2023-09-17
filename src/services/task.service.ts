import { TaskEntity } from "../database/entities/task.entity";
import { TaskRepository } from "../database/repositories/task.repository";
import { FindOptions } from "../interfaces/database/repository.interface";

class TaskCls {

    public async create(task: TaskEntity) {
        console.log("task", task)
        const startTime = Date.now();
        const taskRepository = new TaskRepository();
        const response = await taskRepository.save(task);
        return this.ensureMinimumDelay<number | undefined>(startTime, 30, response);
    }

    public async find(options?: { where?: FindOptions<TaskEntity>, select?: (keyof TaskEntity)[] }) {
        console.log("options", options)
        const startTime = Date.now();
        const taskRepository = new TaskRepository()
        const response = await taskRepository.find(options);
        return this.ensureMinimumDelay<TaskEntity[]>(startTime, 30, response);
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