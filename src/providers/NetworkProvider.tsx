import {
    createContext,
    useContext, useEffect,
    useState,
} from "react";

// @ts-ignore
import {io} from 'socket.io-client';

// types
import {
    BasicProviderPropTypes,
    NetworkProviderContextType,
} from "./types.ts";


const socket = io('http://localhost:3001');

const NetworkContext = createContext({} as NetworkProviderContextType);

const NetworkProvider = (props: BasicProviderPropTypes) => {
    const {children} = props;

    const [connected, setConnected] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const sendPing = () => {
        setIsLoading(true);
        socket.emit("ping")
    }

    useEffect(() => {
        sendPing()
        socket.on('pong', () => {
            setIsLoading(false)
            setConnected(true);
        });

        socket.on('connect', () => {
            setIsLoading(false)
            setConnected(true);
        });

        socket.on("disconnect", () => {
            setIsLoading(false)
            setConnected(false);
        })

        socket.on("error", () => {
            setIsLoading(false)
            setConnected(false);
        })

        socket.on("connect_error", () => {
            setIsLoading(false)
            setConnected(false);
        })

        return () => {
            socket.disconnect()
        };
    }, []);


    return (
        <NetworkContext.Provider
            value={{connected, isLoading, sendPing}}
        >
            {children}
        </NetworkContext.Provider>
    );
};

const useNetwork = () => {
    const context = useContext(NetworkContext);

    if (context === undefined)
        throw new Error("networkContext must be used within a Provider");
    return context;
};

export {NetworkProvider, useNetwork};
