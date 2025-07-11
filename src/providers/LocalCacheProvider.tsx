/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from "react";

// config
import { config } from "../config.ts";

// types
import {
  BasicProviderPropTypes,
  LocalCacheProviderContextType,
  FileDataType,
} from "./types.ts";

// lib
import { BaseEntityDto, fromLocal, Tables, toLocal } from "lib";

// fileCache
import { useFileCache } from "./FileCacheProvider.tsx";

const LocalCacheContext = createContext({} as LocalCacheProviderContextType);

const LocalCacheProvider = (props: BasicProviderPropTypes) => {
  const { children } = props;

  const fileCache = useFileCache();

  const [data, setData] = useState<FileDataType>({
    [Tables.Products]: [],
    [Tables.Categories]: [],
    [Tables.Movements]: [],
    [Tables.MovementLogs]: [],
  });

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
      toLocal(config.localCache, newData);
      try {
        fileCache.updateFile(newData);
      } catch (err) {
        console.error(err);
      }
    },
    [data, fileCache]
  );

  const loadCache = useCallback(
    <T = BaseEntityDto,>(key: Tables): T[] | null => {
      const content = fromLocal(config.localCache, "object");
      return content ? content[key] : null;
    },
    []
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
