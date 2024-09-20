import React, { useContext } from 'react'
import { View } from 'react-native'
import Toggle from '../../components/Ui/Toggle';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { SettingsScreenStyles } from '../../theme/SettingsScreenTheme';
import { useTheme } from '../../context/ThemeContext';

export const SettingsScreen = () => {

    const { theme, toggleTheme, typeTheme } = useTheme();
    const { vibration, handleVibrationState } = useContext(SettingsContext);

    return (
        <View style={SettingsScreenStyles(theme).SettingsScreen}>
            <>
                <Toggle
                    label='Vibracion en escaneo'
                    message="Hacer vibrar el celular cuando escaneas."
                    extraStyles={{}}
                    value={vibration}
                    onChange={(value: boolean) => handleVibrationState(value)}
                />

                <View style={SettingsScreenStyles(theme).divider}></View>

                <Toggle
                    label='Apariencia'
                    message="Personaliza el aspecto de Olei en tu dispositivo."
                    extraStyles={{}}
                    value={typeTheme === 'light' ? true : false}
                    onChange={(value: boolean) => toggleTheme()}
                />

                <View style={SettingsScreenStyles(theme).divider}></View>
            </>
        </View>
    )
}