import React, { useContext, useEffect, useReducer, useState } from 'react';
import { SettingsContext } from './SettingsContext';
import { settingsReducer } from './settingsReducer';
import UserInterface from '../../interface/user';

export interface SettingsInterface {
    vibration: boolean;
    cameraAvailable: boolean;
    limitProductsScanned: number;
    codeBarStatus?: boolean

}

export const SettingsInitialState: SettingsInterface = {
    vibration: true,
    cameraAvailable: true,
    limitProductsScanned: 20,
    codeBarStatus: false
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
        dispatch({ type: 'userSetup', user });
    }

    return (
        <SettingsContext.Provider value={{
            ...state,
            handleVibrationState,
            handleCameraAvailable,
            handleLimitProductsScanned,
            handleSetupUser
        }}
        >
            {children}
        </SettingsContext.Provider>
    )

}