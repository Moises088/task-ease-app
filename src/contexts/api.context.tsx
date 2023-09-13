import React, { createContext } from "react";
import { ApiContextData } from "../interfaces/screens/api.interface";
import { AxiosResponse } from "axios";
import { TaskRepository } from "../database/repositories/task.repository";
import Spinner from 'react-native-loading-spinner-overlay'
import { Language } from "../services/language.service";

export const ApiContext = createContext<ApiContextData>({} as ApiContextData);

export const ApiProvider = ({ children }: any) => {

  const [load, setLoad] = React.useState<boolean>(true)
  const [loading, setLoading] = React.useState<boolean>(false);
  const [visible, setVisible] = React.useState<boolean>(false)
  const [statusCode, setStatusCode] = React.useState<number>();
  const [language, setLanguage] = React.useState<"pt-BR" | "en">("pt-BR");

  React.useEffect(() => {
    loadLanguage()
  }, [])

  const databaseInit = async () => {
    await new TaskRepository().init();
    setLoad(false)
  }

  const loadLanguage = async () => {
    const get = await Language.getActiveLanguage();
    setLanguage(get.id)
    await databaseInit()
  }

  async function makeApiRequest<T>(requestFunction: () => Promise<AxiosResponse<T>>): Promise<{ data: T, statusCode: number }> {
    try {
      setLoading(true)
      const { data } = await requestFunction()
      setLoading(false)
      setStatusCode(200)
      return { data, statusCode: 200 };
    } catch (error) {
      console.error(error)
      setLoading(false)
      setStatusCode(400)
      return { data: null as T, statusCode: 400 }
    } finally {
      setLoading(false)
      setTimeout(() => {
        setStatusCode(undefined)
      }, 1500);
    }
  }

  async function makeLocalRequest<T>(requestFunction: () => Promise<T>): Promise<{ data: T, statusCode: number }> {
    try {
      setLoading(true)
      const data = await requestFunction()
      setLoading(false)
      setStatusCode(200)
      return { data, statusCode: 200 };
    } catch (error) {
      console.error(error)
      setLoading(false)
      setStatusCode(400)
      return { data: null as T, statusCode: 400 }
    } finally {
      setTimeout(() => {
        setStatusCode(undefined)
      }, 1500);
    }
  }

  async function makeLocalStorageRequest<T>(requestFunction: () => Promise<T>): Promise<{ data: T }> {
    try {
      setVisible(true)
      const data = await requestFunction()
      setVisible(false)
      return { data };
    } catch (error) {
      console.error(error)
      setVisible(false)
      setStatusCode(400)
      return { data: null as T }
    } finally {
      setTimeout(() => {
        setStatusCode(undefined)
      }, 1500);
    }
  }

  return (
    <ApiContext.Provider value={{
      makeApiRequest, makeLocalRequest, makeLocalStorageRequest,
      loading, statusCode, load, language, setLanguage
    }}>
      <Spinner visible={visible} />
      {children}
    </ApiContext.Provider>
  );
}

export default ApiProvider;
