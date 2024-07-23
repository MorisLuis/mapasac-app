import React, { useContext, useEffect, useState } from 'react'

import { Button, Text, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../../theme/appTheme';
import { Id_TipoMovInvInterface, getTypeOfMovements } from '../../services/typeOfMovement';
import { AuthContext } from '../../context/auth/AuthContext';
import { Selector } from '../../components/Ui/Selector';
import Toggle from '../../components/Ui/Toggle';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { Counter } from '../../components/Ui/Counter';
import { buttonStyles } from '../../theme/UI/buttons';
import Toast from 'react-native-toast-message';
import { SettingsScreenStyles } from '../../theme/SettingsScreenTheme';
import { useTheme } from '../../context/ThemeContext';

export const SettingsScreen = () => {

    //const { updateTypeOfMovements } = useContext(AuthContext);
    const { theme, toggleTheme, typeTheme } = useTheme();

    const { vibration, handleVibrationState, limitProductsScanned, handleLimitProductsScanned } = useContext(SettingsContext);
    //const [typeSelected, setTypeSelected] = useState<number>()

    //const [typeOfMovement, setTypeOfMovement] = useState<Id_TipoMovInvInterface[]>([]);

    const [editingLimitProducts, setEditingLimitProducts] = useState(false);
    const [limitProductValue, setLimitProductValue] = useState(limitProductsScanned)


    /* const onChangetTypeOfMovement = (value: number) => {
        if (value === undefined || value === null) return
        setTypeSelected(value)
        updateTypeOfMovements(value)
    } */

    const onChangeLimitProducts = () => {
        handleLimitProductsScanned(limitProductValue);
        setEditingLimitProducts(!editingLimitProducts);
        Toast.show({
            type: 'tomatoToast',
            text1: 'Se cambio el limite de productos!'
        })
    }

    /* useEffect(() => {
        console.log('Settings Screen effect');
        const handleGetTypeOfMovements = async () => {
            const types = await getTypeOfMovements();
            setTypeOfMovement(types)
        }
        setTypeSelected(user?.Id_TipoMovInv?.Id_TipoMovInv)
        handleGetTypeOfMovements()
    }, []); */

    //const visible = (typeOfMovement?.length > 0) ? true : false;

    return (
        <>
            <View style={SettingsScreenStyles(theme).SettingsScreen}>
                <>
                    {/* <Selector
                                label={"Tipo de movimiento"}
                                items={typeOfMovement.map((item: any) => {
                                    return { label: item?.Descripcion, value: item?.Id_TipoMovInv }
                                })}
                                value={
                                    typeSelected !== undefined && typeOfMovement.length > 0 ?
                                        typeOfMovement.find(item => item.Id_TipoMovInv === typeSelected)?.Descripcion.trim() as string :
                                        'Selecciona una opción...'
                                }
                                //Methods
                                onValueChange={(value) => onChangetTypeOfMovement(value)}
                            />

                    <View style={SettingsScreenStyles(theme).divider}></View> */}

                    <Toggle
                        label='Vibracion en escaneo'
                        message="Hacer vibrar el celular cuando escaneas."
                        extraStyles={{}}
                        value={vibration}
                        onChange={(value: boolean) => handleVibrationState(value)}
                    />

                    <View style={SettingsScreenStyles(theme).divider}></View>

                    <View style={SettingsScreenStyles(theme).section}>
                        <View style={SettingsScreenStyles(theme).sectionContent}>
                            <View>
                                <Text style={SettingsScreenStyles(theme).label}>Limite de productos a escanear</Text>
                                {
                                    !editingLimitProducts &&
                                    <Text style={{ color: theme.text_color }}>{limitProductValue}</Text>
                                }
                            </View>
                            <TouchableOpacity onPress={() => setEditingLimitProducts(!editingLimitProducts)}>
                                <Text style={SettingsScreenStyles(theme).edit}>
                                    {!editingLimitProducts ? "Editar" : "Cancelar"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {
                            editingLimitProducts &&
                            <>
                                <View style={SettingsScreenStyles(theme).sectionClosed}>
                                    <Counter counter={limitProductValue} setCounter={setLimitProductValue} />
                                </View>
                                <TouchableOpacity style={[buttonStyles(theme).button_small, { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom }]} onPress={onChangeLimitProducts}>
                                    <Text style={buttonStyles(theme, typeTheme).buttonTextTertiary}>Guardar</Text>
                                </TouchableOpacity>
                            </>
                        }
                    </View>

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

        </>
    )
}