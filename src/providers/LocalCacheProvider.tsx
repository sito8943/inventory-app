/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// config
import { config } from "../config.ts";

// types
import {
  BasicProviderPropTypes,
  ConfigProviderContextType,
  FileDataType,
} from "./types.ts";

// lib
import { BaseEntityDto, Tables, TauriClient, toLocal } from "lib";

const LocalCacheContext = createContext({} as ConfigProviderContextType);

const LocalCacheProvider = (props: BasicProviderPropTypes) => {
  const { children } = props;

  const tauriClient = useMemo(() => new TauriClient(), []);
  const [data, setData] = useState<FileDataType>({
    [Tables.Products]: [],
    [Tables.Categories]: [],
    [Tables.Movements]: [],
    [Tables.MovementLogs]: [],
  });

  const updateFile = useCallback(
    async (data: FileDataType) => {
      try {
        toLocal(config.localCache, JSON.stringify(data));
      } catch (e) {
        console.error(e);
        await tauriClient.createFile(config.configFile, `{}`);
      }
    },
    [tauriClient]
  );

  const readFile = useCallback(async () => {
    try {
      const file = await tauriClient.readFile(config.configFile);
      return JSON.parse(file);
    } catch (e) {
      console.error(e);
    }
  }, [tauriClient]);

  const updateCache = useCallback(
    <T = BaseEntityDto,>(key: Tables, value: T[]) => {
      const newData = {
        ...data,
        [key]: value,
      };
      setData(
        (prevData) =>
          ({
            ...prevData,
            [key]: value,
          }) as FileDataType
      );
      updateFile(newData).then(() => console.info("config file updated"));
    },
    [data, updateFile]
  );

  const loadCache = useCallback(
    async <T = BaseEntityDto,>(key: Tables): Promise<T[] | null> => {
      const content = await readFile();
      return content ? content[key] : null;
    },
    [readFile]
  );

  return (
    <LocalCacheContext.Provider value={{ updateCache, loadCache }}>
      {children}
    </LocalCacheContext.Provider>
  );
};

const useLocalCache = () => {
  const context = useContext(LocalCacheContext);

  if (context === undefined)
    throw new Error("configContext must be used within a Provider");
  return context;
};

export { LocalCacheProvider, useLocalCache };
