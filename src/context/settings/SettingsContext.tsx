import { createContext } from "react";


interface ContextProps {
    handleVibrationState: (value: boolean) => void;
    vibration?: boolean
}

export const SettingsContext = createContext({} as ContextProps)