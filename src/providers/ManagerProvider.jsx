/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useContext, useEffect } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// manager
import Manager from "../db/Manager";

const ManagerContext = createContext();

/**
 * Manager Provider
 * @param {object} props - provider props
 * @returns Provider
 */
const ManagerProvider = (props) => {
  const { children } = props;

  const [manager, setManager] = useState();

  useEffect(() => {
    setManager(new Manager());
  }, []);

  const value = { manager };
  return (
    <ManagerContext.Provider value={value}>{children}</ManagerContext.Provider>
  );
};

ManagerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * useManager hook
 * @returns function hook
 */
const useManager = () => {
  const context = useContext(ManagerContext);
  if (context === undefined)
    throw new Error("managerContext must be used within a Provider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ManagerProvider, useManager };
