import React, { useContext, useEffect, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';

import { StyleSheet, View } from 'react-native'
import { colores, globalStyles } from '../../theme/appTheme';
import { selectStyles } from '../../theme/UI/inputs';
import { Id_TipoMovInvInterface, getTypeOfMovements } from '../../services/typeOfMovement';
import { AuthContext } from '../../context/auth/AuthContext';

export const SettingsScreen = () => {

    const [typeOfMovement, setTypeOfMovement] = useState<Id_TipoMovInvInterface[]>([]);
    const [typeSelected, setTypeSelected] = useState<number>()
    const { user, updateTypeOfMovements } = useContext(AuthContext);

    const onChangetTypeOfMovement = () => {
        if (!typeSelected) return
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

    return (
        <View style={styles.SettingsScreen}>
            {
                typeOfMovement &&
                <RNPickerSelect

                    onValueChange={(value) => setTypeSelected(value)}

                    placeholder={{
                        label: 'Selecciona una opción...',
                        value: null,
                    }}
                    items={typeOfMovement.map((item: any) => {
                        return { label: item?.Descripcion, value: item?.Id_TipoMovInv }
                    })}
                    onDonePress={onChangetTypeOfMovement}

                    style={selectStyles}
                    //value={typeSelected === null ? undefined : typeSelected}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    SettingsScreen: {
        flex: 1,
        padding: globalStyles.globalPadding.padding,
        backgroundColor: colores.background_color
    },
    content: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    section: {
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "transparent",
        borderBottomColor: 'black',
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    }
})