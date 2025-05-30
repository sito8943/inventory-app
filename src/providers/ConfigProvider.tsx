import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BasicProviderPropTypes, ConfigProviderContextType } from "./types.ts";

// client
import TauriClient from "../db/TauriClient.ts";
import { config } from "../config.ts";

const ConfigContext = createContext({} as ConfigProviderContextType);

const ConfigProvider = (props: BasicProviderPropTypes) => {
  const { children } = props;

  const tauriClient = useMemo(() => new TauriClient(), []);
  const [data, setData] = useState();

  const init = useCallback(() => {
    try {
      const file = tauriClient.readFile(config.configFile);
      console.log(file);
    } catch (e) {
      console.error((e as Error).message);
    }
  }, [tauriClient]);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ConfigContext.Provider value={{ data, updateData: setData }}>
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
