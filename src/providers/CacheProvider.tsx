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

const CacheContext = createContext({} as ConfigProviderContextType);

const CacheProvider = (props: BasicProviderPropTypes) => {
    const {children} = props;

    const tauriClient = useMemo(() => new TauriClient(), []);
    const [data, setData] = useState<FileDataType>({
        [Tables.Products]: [],
        [Tables.Categories]: [],
        [Tables.Movements]: [],
        [Tables.MovementLogs]: [],
    });

    const updateFile = useCallback(async (data: FileDataType) => {
        try {
            await tauriClient.writeTextFile(config.configFile, JSON.stringify(data));
        } catch (e) {
            console.error(e);
            await tauriClient.createFile(config.configFile, `{}`);
        }
    }, [tauriClient]);

    const readFile = useCallback(async () => {
        try {
            const file = await tauriClient.readFile(config.configFile);
            return JSON.parse(file) as FileDataType;
        } catch (e) {
            console.error(e);
        }
    }, [tauriClient]);

    const updateCache = useCallback((key: Tables, value: BaseEntityDto[]) => {
        const newData = {...data}
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        } as FileDataType))
        updateFile(newData).then(() => console.info("config file updated"));
    }, [data, updateFile])

    const loadCache = useCallback(async (key: Tables) => {
        const content = await readFile()
        return content ? content[key] : null
    }, [readFile])


    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <CacheContext.Provider
            value={{updateCache, loadCache}}
        >
            {children}
        </CacheContext.Provider>
    );
};

const useCache = () => {
    const context = useContext(CacheContext);

    if (context === undefined)
        throw new Error("configContext must be used within a Provider");
    return context;
};

export {CacheProvider, useCache};
