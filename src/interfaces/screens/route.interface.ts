import { TaskEntity } from "../../database/entities/task.entity";

/**
 * Type definition for the parameters in the root stack navigator.
*/
export type RootStackParamList = {
    /**
     * Home screen with no additional parameters.
    */
    HomeScreen: undefined;

    /**
     * Settings screen with no additional parameters.
    */
    SettingsScreen: undefined;

    /**
     * Create screen with action as a parameter, represented by a string.
    */
    CreateScreen: { action: string };

    /**
     * Task screen with a task entity as a parameter.
    */
    TaskScreen: { task: TaskEntity };
};
