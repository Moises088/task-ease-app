export interface HomeCreate {
    label: string,
    icon: () => JSX.Element,
    click: () => void;
    backgroundColor: string,
    color: string,
    action: string,
}