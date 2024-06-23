import { createContext } from "react";
import UserInterface from "../../interface/user";


interface ContextProps {
    handleVibrationState: (value: boolean) => void;
    handleCameraAvailable: (value: boolean) => void;
    handleLimitProductsScanned: (value: number) => void;

    vibration?: boolean;
    cameraAvailable?: boolean;
    limitProductsScanned: number;

    handleSetupUser: (value: UserInterface) => void;
    handleCodebarScannedProcces: (value: boolean) => void;
    updateBarCode: (value: string) => void;
    updateTypeOfMovements: (value: number) => void;
}

export const SettingsContext = createContext({} as ContextProps)