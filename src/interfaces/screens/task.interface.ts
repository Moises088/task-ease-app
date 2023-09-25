import { TextInput } from "react-native";

export interface TaskOptionsProps {
    activeOption: "check" | "list" | "list-ol",
    setActiveOption: (activeOption: "check" | "list" | "list-ol") => void;
}

export interface TaskItemProps {
    index: number;
    item: TaskItem;
    setItens: (item: TaskItem[]) => void;
    itens: TaskItem[];
    textInputRefs: React.MutableRefObject<TextInput[] | null[]>
}

export interface TaskItem {
    id?: number;
    title: string;
    type: "check" | "list" | "list-ol";
    checked?: boolean;
    description?: string;
}