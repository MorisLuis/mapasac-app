import React, { useContext, useEffect, useState } from 'react'

import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colores, globalFont, globalStyles } from '../../theme/appTheme';
import { Id_TipoMovInvInterface, getTypeOfMovements } from '../../services/typeOfMovement';
import { AuthContext } from '../../context/auth/AuthContext';
import { Selector } from '../../components/Ui/Selector';
import Toggle from '../../components/Ui/Toggle';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { Counter } from '../../components/Ui/Counter';
import { buttonStyles } from '../../theme/UI/buttons';
import Toast from 'react-native-toast-message';

export const SettingsScreen = () => {

    const { vibration, handleVibrationState, limitProductsScanned, handleLimitProductsScanned, updateTypeOfMovements} = useContext(SettingsContext);
    const [typeSelected, setTypeSelected] = useState<number>()

    const [typeOfMovement, setTypeOfMovement] = useState<Id_TipoMovInvInterface[]>([]);
    const { user } = useContext(AuthContext);

    const [editingLimitProducts, setEditingLimitProducts] = useState(false);
    const [limitProductValue, setLimitProductValue] = useState(limitProductsScanned)


    const onChangetTypeOfMovement = () => {
        if (typeSelected === undefined || typeSelected === null) return
        updateTypeOfMovements(typeSelected)
    }

    const onChangeLimitProducts = () => {
        handleLimitProductsScanned(limitProductValue);
        setEditingLimitProducts(!editingLimitProducts);
        Toast.show({
            type: 'tomatoToast',
            text1: 'Se cambio el limite de productos!',
        })
    }

    useEffect(() => {
        console.log('Settings Screen effect');
        const handleGetTypeOfMovements = async () => {
            const types = await getTypeOfMovements();
            setTypeOfMovement(types)
        }
        setTypeSelected(user?.Id_TipoMovInv?.Id_TipoMovInv)
        handleGetTypeOfMovements()
    }, []);

    const visible = (typeOfMovement?.length > 0) ? true : false;

    return (
        <>
            <View style={styles.SettingsScreen}>
                {
                    visible ?
                        <>
                            <Selector
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
                                onDone={onChangetTypeOfMovement}
                                onValueChange={(value) => setTypeSelected(value)}
                            />

                            <View style={styles.divider}></View>

                            <Toggle
                                label='Vibracion en escaneo'
                                message="Hacer vibrar el celular cuando escaneas."
                                extraStyles={{}}
                                value={vibration}
                                onChange={(value: boolean) => handleVibrationState(value)}
                            />

                            <View style={styles.divider}></View>

                            <View style={styles.section}>
                                <View style={styles.sectionContent}>
                                    <View>
                                        <Text style={styles.label}>Limite de productos a escanear</Text>
                                        {
                                            !editingLimitProducts &&
                                            <Text>{limitProductValue}</Text>
                                        }
                                    </View>
                                    <TouchableOpacity onPress={() => setEditingLimitProducts(!editingLimitProducts)}>
                                        <Text style={styles.edit}>
                                            {!editingLimitProducts ? "Editar" : "Cancelar"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                {
                                    editingLimitProducts &&
                                    <>
                                        <View style={styles.sectionClosed}>
                                            <Counter counter={limitProductValue} setCounter={setLimitProductValue} />
                                        </View>
                                        <TouchableOpacity style={[buttonStyles.button_small, { marginBottom: globalStyles.globalMarginBottom.marginBottom }]} onPress={onChangeLimitProducts}>
                                            <Text style={buttonStyles.buttonTextSecondary}>Guardar</Text>
                                        </TouchableOpacity>
                                    </>
                                }
                            </View>

                            <View style={styles.divider}></View>

                        </>
                        :
                        <View>
                            <Text>
                                Cargando...
                            </Text>
                        </View>
                }
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    SettingsScreen: {
        flex: 1,
        padding: globalStyles.globalPadding.padding,
        backgroundColor: colores.background_color,
        paddingVertical: globalStyles.globalPadding.padding * 2
    },
    section: {
        display: "flex",
        ///backgroundColor: 'red'
        //paddingTop: globalStyles.globalPadding.padding * 1.5
    },
    sectionContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    sectionClosed: {
        paddingTop: globalStyles.globalPadding.padding
    },
    label: {
        fontSize: globalFont.font_normal,
        fontWeight: "bold"
    },
    divider: {
        borderBottomWidth: 0.75,
        marginVertical: globalStyles.globalMarginBottom.marginBottom * 1.5,
        color: colores.color_border_secondary
    },
    edit: {
        fontWeight: 'bold',
        textDecorationLine: "underline"
    }
})