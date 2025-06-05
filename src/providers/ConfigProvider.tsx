import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

// config
import {config} from "../config.ts";

// types
import {
    BasicProviderPropTypes,
    ConfigProviderContextType,
    FileDataType,
} from "./types.ts";
import {Tables} from "../db/types";
import {BaseEntityDto} from "lib";

// client
import TauriClient from "../db/TauriClient.ts";

const ConfigContext = createContext({} as ConfigProviderContextType);

const ConfigProvider = (props: BasicProviderPropTypes) => {
    const {children} = props;

    const tauriClient = useMemo(() => new TauriClient(), []);
    const [data, setData] = useState<FileDataType>({
        [Tables.Products]: [],
        [Tables.Categories]: [],
        [Tables.Movements]: [],
        [Tables.MovementLogs]: [],
    });

    const updateData = useCallback((key: Tables, value: BaseEntityDto[]) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        } as FileDataType))
    }, [])

    const updateFile = useCallback(async () => {
        try {
            await tauriClient.writeTextFile(config.configFile, JSON.stringify(data));
        } catch (e) {
            console.error(e);
            await tauriClient.createFile(config.configFile, `{}`);
        }
    }, [tauriClient, data]);


    useEffect(() => {
        updateFile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <ConfigContext.Provider
            value={{data, updateData}}
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

export {ConfigProvider, useConfig};
