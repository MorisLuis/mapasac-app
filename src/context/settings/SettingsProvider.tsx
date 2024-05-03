import React, { useContext, useEffect, useReducer, useState } from 'react';
import { SettingsContext } from './SettingsContext';
import { settingsReducer } from './settingsReducer';

export interface SettingsInterface {
    vibration: boolean;
    cameraAvailable: boolean;
    limitProductsScanned: number;
}

export const SettingsInitialState: SettingsInterface = {
    vibration: true,
    cameraAvailable: true,
    limitProductsScanned: 20
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
        console.log({value})
        dispatch({ type: '[Settings] - limitProductsScanned state', limitProductsScanned: value });
    }

    return (
        <SettingsContext.Provider value={{
            ...state,
            handleVibrationState,
            handleCameraAvailable,
            handleLimitProductsScanned
        }}
        >
            {children}
        </SettingsContext.Provider>
    )

}