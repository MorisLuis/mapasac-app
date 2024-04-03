import React, { useContext, useEffect, useReducer, useState } from 'react';
import { SettingsContext } from './SettingsContext';
import { settingsReducer } from './settingsReducer';

export interface SettingsInterface {
    vibration: boolean;
}

export const SettingsInitialState: SettingsInterface = {
    vibration: true
}


export const SettingsProvider = ({ children }: { children: JSX.Element }) => {

    const [state, dispatch] = useReducer(settingsReducer, SettingsInitialState);

    const handleVibrationState = (value: boolean) => {
        //console.log({value})
        dispatch({ type: '[Settings] - Vibration state', vibration: value });
    }

    return (
        <SettingsContext.Provider value={{
            ...state,
            handleVibrationState
        }}
        >
            {children}
        </SettingsContext.Provider>
    )

}