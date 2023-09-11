import React from "react";
import { TaskRepository } from "../database/repositories/task.repository";
import { RepositoryContextData } from "../interfaces/database/repository.interface";

export const RepositoryContext = React.createContext<RepositoryContextData>({} as RepositoryContextData);

export const RepositoryProvider = ({ children }: any) => {
  const [Task] = React.useState(new TaskRepository())
  const [load, setLoad] = React.useState<boolean>(true)

  React.useEffect(() => {
    databaseInit()
  }, [])

  const databaseInit = async () => {
    await Task.init();
    setLoad(false)
  }

  return (
    <RepositoryContext.Provider value={{ Task, load }}>
      {children}
    </RepositoryContext.Provider>
  );
};