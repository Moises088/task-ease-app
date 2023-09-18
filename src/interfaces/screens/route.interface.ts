import { TaskEntity } from "../../database/entities/task.entity";

export type RootStackParamList = {
    HomeScreen: undefined;
    SettingsScreen: undefined;
    CreateScreen: { action: string };
    TaskScreen: { task: TaskEntity };
};