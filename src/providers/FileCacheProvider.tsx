/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo } from "react";

// config
import { config } from "../config.ts";

// types
import {
  BasicProviderPropTypes,
  FileCacheProviderContextType,
  FileDataType,
} from "./types.ts";

// lib
import { TauriClient } from "lib";

const FileCacheContext = createContext({} as FileCacheProviderContextType);

const FileCacheProvider = (props: BasicProviderPropTypes) => {
  const { children } = props;

  const tauriClient = useMemo(() => new TauriClient(), []);

  const updateFile = useCallback(
    async (data: FileDataType) => {
      try {
        await tauriClient.writeTextFile(
          config.configFile,
          JSON.stringify(data)
        );
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
      return JSON.parse(file) as FileDataType;
    } catch (e) {
      console.error(e);
    }
  }, [tauriClient]);

  return (
    <FileCacheContext.Provider value={{ readFile, updateFile }}>
      {children}
    </FileCacheContext.Provider>
  );
};

const useFileCache = () => {
  const context = useContext(FileCacheContext);

  if (context === undefined)
    throw new Error("configContext must be used within a Provider");
  return context;
};

export { FileCacheProvider, useFileCache };
