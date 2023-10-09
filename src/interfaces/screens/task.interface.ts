import { TextInput } from "react-native";

/**
 * Interface representing the props for task options.
*/
export interface TaskOptionsProps {
    /**
     * The currently active option: "check", "list", or "list-ol".
    */
    activeOption: "check" | "list" | "list-ol";

    /**
     * Function to set the active option.
     * @param activeOption - The option to set as active: "check", "list", or "list-ol".
    */
    setActiveOption: (activeOption: "check" | "list" | "list-ol") => void;
}

/**
 * Interface representing the props for a task item.
*/
export interface TaskItemProps {
    /**
     * The index of the task item.
    */
    index: number;

    /**
     * The task item.
    */
    item: TaskItem;

    /**
     * Function to set the task items.
     * @param items - The updated task items.
    */
    setItens: (items: TaskItem[]) => void;

    /**
     * The list of task items.
    */
    itens: TaskItem[];

    /**
     * Mutable ref for the text input associated with the task item.
    */
    textInputRefs: React.MutableRefObject<TextInput[] | null[]>;
}

/**
 * Interface representing a task item.
*/
export interface TaskItem {
    /**
     * The unique identifier for the task item.
    */
    id?: number;

    /**
     * The title or text of the task item.
    */
    title: string;

    /**
     * The type of the task item: "check", "list", or "list-ol".
    */
    type: "check" | "list" | "list-ol";

    /**
     * A flag indicating whether the task item is checked.
    */
    checked?: boolean;

    /**
     * Additional description or details for the task item.
    */
    description?: string;
}
