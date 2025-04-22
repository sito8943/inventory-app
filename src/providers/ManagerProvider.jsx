/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// manager
import Manager from "../db/Manager";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { defaultMovements } from "../hooks/queries/useMovements.jsx";

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

const ManagerContext = createContext({});

/**
 * Manager Provider
 * @param {object} props - provider props
 * @returns {object} React component
 */
const ManagerProvider = (props) => {
  const { i18n } = useTranslation();
  const { children } = props;

  const manager = new Manager();

  useEffect(async () => {
    await manager.Movements.init(defaultMovements[i18n.language]);
  }, []);

  return (
    <ManagerContext.Provider value={{ client: manager }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ManagerContext.Provider>
  );
};

ManagerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * useManager hook
 * @returns {Manager} Provider
 */
const useManager = () => {
  const context = useContext(ManagerContext);

  if (context === undefined)
    throw new Error("managerContext must be used within a Provider");
  return context.client;
};

// eslint-disable-next-line react-refresh/only-export-components
export { queryClient, ManagerProvider, useManager };
