export enum HomeCreateActionType {
    none = "none",
    task = "task",
    book = "book",
    shopping = "shopping",
    movie = "movie",
    desire = "desire",
    travel = "travel",
    gift = "gift",
}

/**
 * Interface for home create icons.
*/
export interface HomeCreate {
    /**
     * Label or text describing the item.
    */
    label: string;

    /**
     * Function to generate the icon as a JSX element.
    */
    icon: () => JSX.Element;

    /**
     * Background color for the item.
    */
    backgroundColor: string;

    /**
     * Color for the item (text, icon).
    */
    color: string;

    /**
     * Action associated with the item.
     * Can be one of the following: "none", "task", "book", "shopping", "movie", "desire", "travel", "gift".
    */
    action: HomeCreateActionType,
}