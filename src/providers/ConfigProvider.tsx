import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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

// client
import TauriClient from "../db/TauriClient.ts";
import { QueryKey, useQuery } from "@tanstack/react-query";

const ConfigContext = createContext({} as ConfigProviderContextType);

const ConfigProvider = (props: BasicProviderPropTypes) => {
  const { children } = props;

  const tauriClient = useMemo(() => new TauriClient(), []);
  const [data, setData] = useState<FileDataType>();
  const [connected, setConnected] = useState(false);

  const init = useCallback(() => {
    try {
      const file = tauriClient.readFile(config.configFile);
    } catch (e) {
      console.error((e as Error).message);
    }
  }, [tauriClient]);

  const checkConnection = useCallback(async () => {
    try {
      const response = await fetch(`${config.apiUrl}app/ping`, {
        method: "GET",
        cache: "no-cache",
      });
      setConnected(true);
      return response.ok; // true si status 2xx
    } catch (error) {
      setConnected(false);
      console.error(error);
      return false;
    }
  }, []);

  const pingServer = useQuery({
    initialData: true,
    queryKey: ["ping"],
    queryFn: checkConnection,
  });

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ConfigContext.Provider
      value={{ data, connected, pingServer, updateData: setData }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

const useConfig = () => {
  const context = useContext(ConfigContext);

  if (context === undefined)
    throw new Error("configContext must be used within a Provider");
  return context;
};

export { ConfigProvider, useConfig };
