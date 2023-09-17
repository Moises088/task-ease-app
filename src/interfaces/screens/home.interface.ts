export interface HomeCreate {
    label: string,
    icon: () => JSX.Element,
    backgroundColor: string,
    color: string,
    action: "none" | "task" | "book" | "shopping" | "movie" | "desire" | "travel" | "gift",
}