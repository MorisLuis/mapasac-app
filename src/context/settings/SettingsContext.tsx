import { createContext } from "react";


interface ContextProps {
    handleVibrationState: (value: boolean) => void;
    handleCameraAvailable: (value: boolean) => void;

    vibration?: boolean;
    cameraAvailable?: boolean
}

export const SettingsContext = createContext({} as ContextProps)