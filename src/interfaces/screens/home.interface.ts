export interface HomeCreate {
    label: string,
    icon: () => JSX.Element,
    backgroundColor: string,
    color: string,
    action: "task" | "book" | "shopping" | "movie" | "desire" | "travel" | "gift",
}