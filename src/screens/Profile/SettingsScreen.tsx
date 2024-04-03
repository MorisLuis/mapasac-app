import React, { useContext, useEffect, useState } from 'react'

import { Button, StyleSheet, Text, View } from 'react-native'
import { colores, globalStyles } from '../../theme/appTheme';
import { Id_TipoMovInvInterface, getTypeOfMovements } from '../../services/typeOfMovement';
import { AuthContext } from '../../context/auth/AuthContext';
import { Selector } from '../../components/Ui/Selector';
import Toast from 'react-native-toast-message';

export const SettingsScreen = () => {

    const [typeOfMovement, setTypeOfMovement] = useState<Id_TipoMovInvInterface[]>([]);
    const [typeSelected, setTypeSelected] = useState<number>()
    const { user, updateTypeOfMovements } = useContext(AuthContext);

    const onChangetTypeOfMovement = () => {
        console.log({typeSelected})
        if (typeSelected === undefined || typeSelected === null) return
        updateTypeOfMovements(typeSelected)
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


    const visible = (typeOfMovement.length > 0) ? true : false

    return (
        <>
            <View style={styles.SettingsScreen}>
                {
                    visible ?
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
                        :
                        <View>
                            <Text>
                                cargando...
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
    }
})