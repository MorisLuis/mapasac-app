import { createContext } from "react";


interface ContextProps {
    handleVibrationState: (value: boolean) => void;
    handleCameraAvailable: (value: boolean) => void;
    handleLimitProductsScanned: (value: number) => void;

    vibration?: boolean;
    cameraAvailable?: boolean;
    limitProductsScanned: number
}

export const SettingsContext = createContext({} as ContextProps)