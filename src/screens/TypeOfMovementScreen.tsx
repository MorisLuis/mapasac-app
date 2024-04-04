import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { colores, globalFont, globalStyles } from '../theme/appTheme';
import { buttonStyles } from '../theme/UI/buttons';
import { Id_TipoMovInvInterface, getTypeOfMovements } from '../services/typeOfMovement';
import { AuthContext } from '../context/auth/AuthContext';
import { useNavigation } from '@react-navigation/native';

export const TypeOfMovementScreen = () => {
    const [typeOfMovement, setTypeOfMovement] = useState<Id_TipoMovInvInterface[]>([]);
    const [typeSelected, setTypeSelected] = useState<number>()
    const { updateTypeOfMovements } = useContext(AuthContext);
    const { navigate } = useNavigation<any>();

    const handleOptionSelect = (option: number) => {
        setTypeSelected(option);
    };

    const renderOption = ({ item }: { item: Id_TipoMovInvInterface }) => {
        const isSelected = typeSelected === item.Id_TipoMovInv;
        return (
            <TouchableOpacity
                style={[styles.optionContainer, isSelected && styles.selectedOption]}
                onPress={() => handleOptionSelect(item.Id_TipoMovInv)}
            >
                <Text style={styles.optionText}>{item.Descripcion}</Text>
            </TouchableOpacity>
        );
    };

    const onChangetTypeOfMovement = () => {
        if (typeSelected === undefined || typeSelected === null) return
        updateTypeOfMovements(typeSelected);
        navigate('BottomNavigation')
    }

    useEffect(() => {
        const handleGetTypeOfMovements = async () => {
            const types = await getTypeOfMovements();
            setTypeOfMovement(types)
        }
        handleGetTypeOfMovements()
    }, []);


    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <Text style={styles.title}>Selecciona que movimiento haras?</Text>
            </SafeAreaView>

            <FlatList
                data={typeOfMovement}
                renderItem={renderOption}
                keyExtractor={typeOfMovement => `${typeOfMovement.Id_TipoMovInv}`}
            />

            {(typeSelected || typeSelected == 0) && (
                <View style={styles.footer}>
                    <TouchableOpacity style={[buttonStyles.button]} onPress={onChangetTypeOfMovement}>
                        <Text style={[buttonStyles.buttonText]}>Avanzar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colores.background_color,
        padding: globalStyles.globalPadding.padding
    },
    header: {
        marginBottom: globalStyles.globalMarginBottom.marginBottom,
        width: "80%"
    },
    title: {
        fontSize: globalFont.font_med
    },
    optionContainer: {
        padding: 10,
        marginBottom: globalStyles.globalMarginBottom.marginBottom,
        borderWidth: 0.7,
        borderRadius: 5,
        borderColor: colores.color_border_tertiary,
    },
    optionText: {
        fontSize: globalFont.font_sm,
    },
    selectedOption: {
        backgroundColor: colores.color_yellow,
    },
    footer: {
        padding: globalStyles.globalPadding.padding,
        paddingBottom: 30,
        backgroundColor: colores.background_color_tertiary,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: Dimensions.get('window').width,
        borderWidth: 1,
        borderColor: colores.color_border
    }
});
