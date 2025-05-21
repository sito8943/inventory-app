import { createContext, useContext, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// manager
import Manager from "../db/Manager";
import { ManagerProviderContextType, BasicProviderPropTypes } from "./types.ts";

// hooks
import { defaultMovements } from "hooks";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: true,
      refetchOnWindowFocus: false, // default: true
    },
  },
});

const ManagerContext = createContext({} as ManagerProviderContextType);

/**
 * Manager Provider
 * @param props - provider props
 * @returns  React component
 */
const ManagerProvider = (props: BasicProviderPropTypes) => {
  const { children } = props;

  const { i18n } = useTranslation();

  const manager = new Manager();

  useEffect(() => {
    const defaultValues = defaultMovements[i18n.language];
    manager.Movements.init(defaultValues).then(() => console.info("init"));
  }, []);

  return (
    <ManagerContext.Provider value={{ client: manager }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ManagerContext.Provider>
  );
};

/**
 * useManager hook
 * @returns Provider
 */
const useManager = () => {
  const context = useContext(ManagerContext);

  if (context === undefined)
    throw new Error("managerContext must be used within a Provider");
  return context.client;
};

// eslint-disable-next-line react-refresh/only-export-components
export { queryClient, ManagerProvider, useManager };
