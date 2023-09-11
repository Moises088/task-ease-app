import React from "react";
import { TaskRepository } from "../database/repositories/task.repository";
import { RepositoryContextData } from "../interfaces/database/repository.interface";

export const RepositoryContext = React.createContext<RepositoryContextData>({} as RepositoryContextData);

export const RepositoryProvider = ({ children }: any) => {
  const [Task, setTask] = React.useState(new TaskRepository())

  React.useEffect(() => {
    console.log("Task>", Task)
  }, [])

  return (
    <RepositoryContext.Provider value={{ Task }}>
      {children}
    </RepositoryContext.Provider>
  );
};