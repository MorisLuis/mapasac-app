import React, { useContext, useEffect, useReducer, useState } from 'react';
import { SettingsContext } from './SettingsContext';
import { settingsReducer } from './settingsReducer';
import UserInterface from '../../interface/user';
import { api } from '../../api/api';
import Toast from 'react-native-toast-message';

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
        dispatch({ type: '[Settings] - userSetup', user });
    }

    const handleCodebarScannedProcces = (value: boolean) => {
        dispatch({ type: '[Settings] - codeBarStatus', codeBarStatus: value });
    }

    const handleGetCodebarType = (codebarType?: number) => {
        console.log({codebarType})
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

    const updateTypeOfMovements = async (value: number) => {
        try {
            const getTypeOfMovements = await api.put(`/api/typeofmovements`, { Id_TipoMovInv: value });
            const typeOfMov = getTypeOfMovements.data;
            dispatch({ type: '[Settings] - typeOfMovement', user: { ...state.user as UserInterface, Id_TipoMovInv: typeOfMov.user.Id_TipoMovInv } });
            Toast.show({
                type: 'tomatoToast',
                text1: 'Se cambio el tipo de movimiento!',
            })
        } catch (error: any) {
            console.log({ error: error })
        }
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
            updateBarCode,
            updateTypeOfMovements
        }}
        >
            {children}
        </SettingsContext.Provider>
    )

}