import React, { useReducer } from 'react';
import { SettingsContext } from './SettingsContext';
import { settingsReducer } from './settingsReducer';
import UserInterface from '../../interface/user';

export interface SettingsInterface {
    vibration?: boolean;
    cameraAvailable?: boolean;
    limitProductsScanned: number;
    user?: UserInterface | null;
    codeBarStatus?: boolean;
    codeBar?: string;
    codebarType?: number;
    startScanning?: boolean
}

export const SettingsInitialState: SettingsInterface = {
    vibration: true,
    cameraAvailable: true,
    limitProductsScanned: 20,
    codeBarStatus: false,
    codeBar: "",
    codebarType: 1,
    startScanning: false
}

export const SettingsProvider = ({ children }: { children: JSX.Element }) => {

    const [state, dispatch] = useReducer(settingsReducer, SettingsInitialState);

    const handleVibrationState = (value: boolean) => {
        dispatch({ type: '[Settings] - Vibration state', vibration: value });
    }

    const handleCameraAvailable = (value: boolean) => {
        dispatch({ type: '[Settings] - CameraAvailable state', cameraAvailable: value });
    }

    const handleLimitProductsScanned = (value: number) => {
        dispatch({ type: '[Settings] - limitProductsScanned state', limitProductsScanned: value });
    }

    const handleSetupUser = (user: UserInterface) => {
        dispatch({ type: '[Settings] - userSetup', user });
    }

    const handleCodebarScannedProcces = (value: boolean) => {
        dispatch({ type: '[Settings] - codeBarStatus', codeBarStatus: value });
    }

    const handleGetCodebarType = (codebarType?: number) => {
        if(!codebarType) return;
        dispatch({ type: '[Settings] - codebarType', codebarType: codebarType });
    }

    const updateBarCode = async (value: string) => {
        try {
            handleCodebarScannedProcces(true)
            dispatch({ type: '[Settings] - codeBar', codeBar: value });
        } catch (error: any) {
            handleCodebarScannedProcces(false)
            console.log({ error: error })
        }
    }


    const handleStartScanning = (value: boolean) => {
        dispatch({ type: '[Settings] - startScanning', startScanning: value });
    }


    return (
        <SettingsContext.Provider value={{
            ...state,
            handleVibrationState,
            handleCameraAvailable,
            handleLimitProductsScanned,
            handleSetupUser,
            handleCodebarScannedProcces,
            handleGetCodebarType,
            handleStartScanning,
            updateBarCode
            
        }}
        >
            {children}
        </SettingsContext.Provider>
    )

}