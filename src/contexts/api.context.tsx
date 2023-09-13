// import React from "react";
// import { ApiContextData } from "../interfaces/screens/api.interface";
// import { TaskRepository } from "../database/repositories/task.repository";
// import { AxiosResponse } from "axios";

// export const ApiContext = React.createContext<ApiContextData>({} as ApiContextData);

// export const ApiProvider = ({ children }: any) => {
//   const [load, setLoad] = React.useState<boolean>(true)
//   React.useEffect(() => {
//     databaseInit()
//   }, [])

//   const databaseInit = async () => {
//     await new TaskRepository().init();
//     setLoad(false)
//   }

//   const [loading, setLoading] = React.useState<boolean>(false);
//   const [statusCode, setStatusCode] = React.useState<number>();

//   async function makeApiRequest<T>(requestFunction: () => Promise<AxiosResponse<T>>): Promise<{ data: T, statusCode: number }> {
//     try {
//       setLoading(true)
//       const { data } = await requestFunction()
//       setLoading(false)
//       setStatusCode(200)
//       return { data, statusCode: 200 };
//     } catch (error) {
//       console.error(error)
//       setLoading(false)
//       setStatusCode(400)
//       return { data: null as T, statusCode: 400 }
//     } finally {
//       setLoading(false)
//       setTimeout(() => {
//         setStatusCode(undefined)
//       }, 1500);
//     }
//   }
//   async function makeLocalRequest<T>(requestFunction: () => Promise<T>): Promise<{ data: T, statusCode: number }> {
//     try {
//       setLoading(true)
//       const data = await requestFunction()
//       setLoading(false)
//       setStatusCode(200)
//       return { data, statusCode: 200 };
//     } catch (error) {
//       console.error(error)
//       setLoading(false)
//       setStatusCode(400)
//       return { data: null as T, statusCode: 400 }
//     } finally {
//       setTimeout(() => {
//         setStatusCode(undefined)
//       }, 1500);
//     }
//   }

//   return (
//     <ApiContext.Provider value={{ load, makeApiRequest, makeLocalRequest, loading, statusCode }}>
//       {children}
//     </ApiContext.Provider>
//   );
// };

import React, { createContext } from "react";
import { ApiContextData } from "../interfaces/screens/api.interface";
import { AxiosResponse } from "axios";
import { TaskRepository } from "../database/repositories/task.repository";

export const ApiContext = createContext<ApiContextData>({} as ApiContextData);

export const ApiProvider = ({ children }: any) => {

  const [load, setLoad] = React.useState<boolean>(true)
  const [loading, setLoading] = React.useState<boolean>(false);
  const [statusCode, setStatusCode] = React.useState<number>();

  React.useEffect(() => {
    databaseInit()
  }, [])

  const databaseInit = async () => {
    await new TaskRepository().init();
    setLoad(false)
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

  return (
    <ApiContext.Provider value={{ makeApiRequest, makeLocalRequest, loading, statusCode, load }}>
      {children}
    </ApiContext.Provider>
  );
}

export default ApiProvider;
