import {ReactNode} from "react";
import Manager from "../db/Manager";

export type ManagerProviderPropTypes = {
    children: ReactNode;
}

export type ManagerProviderContextType = {
    client: Manager
}