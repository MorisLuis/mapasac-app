import React, { useContext, useEffect, useReducer, useState } from 'react';
import { SettingsContext } from './SettingsContext';
import { settingsReducer } from './settingsReducer';

export interface SettingsInterface {
    vibration: boolean;
    cameraAvailable: boolean;
}

export const SettingsInitialState: SettingsInterface = {
    vibration: true,
    cameraAvailable: true
}

export const SettingsProvider = ({ children }: { children: JSX.Element }) => {

    const [state, dispatch] = useReducer(settingsReducer, SettingsInitialState);

    const handleVibrationState = (value: boolean) => {
        dispatch({ type: '[Settings] - Vibration state', vibration: value });
    }

    const handleCameraAvailable = (value: boolean) => {
        dispatch({ type: '[Settings] - CameraAvailable state', cameraAvailable: value });
    }

    return (
        <SettingsContext.Provider value={{
            ...state,
            handleVibrationState,
            handleCameraAvailable
        }}
        >
            {children}
        </SettingsContext.Provider>
    )

}