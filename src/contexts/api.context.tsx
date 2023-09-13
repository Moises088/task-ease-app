import React from "react";
import { ApiContextData } from "../interfaces/database/repository.interface";
import { TaskRepository } from "../database/repositories/task.repository";

export const ApiContext = React.createContext<ApiContextData>({} as ApiContextData);

export const ApiProvider = ({ children }: any) => {
  const [load, setLoad] = React.useState<boolean>(true)

  React.useEffect(() => {
    databaseInit()
  }, [])

  const databaseInit = async () => {
    await new TaskRepository().init();
    setLoad(false)
  }

  return (
    <ApiContext.Provider value={{ load }}>
      {children}
    </ApiContext.Provider>
  );
};