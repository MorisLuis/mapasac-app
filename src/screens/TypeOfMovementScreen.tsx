import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { colores, globalFont, globalStyles } from '../theme/appTheme';
import { buttonStyles } from '../theme/UI/buttons';
import { Id_TipoMovInvInterface, getTypeOfMovements } from '../services/typeOfMovement';
import { useNavigation } from '@react-navigation/native';
import { TypeOfMovementSkeleton } from '../components/Skeletons/TypeOfMovementSkeleton';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SettingsContext } from '../context/settings/SettingsContext';
import { AuthContext } from '../context/auth/AuthContext';

export const TypeOfMovementScreen = () => {

    const [typeOfMovement, setTypeOfMovement] = useState<Id_TipoMovInvInterface[]>([]);
    const [typeSelected, setTypeSelected] = useState<number>()
    const { updateTypeOfMovements } = useContext(AuthContext);
    const { navigate } = useNavigation<any>();
    const [isLoading, setIsLoading] = useState(false);

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
        try {
            if (typeSelected === undefined || typeSelected === null) return
            updateTypeOfMovements(typeSelected);
            navigate('BottomNavigation')
        } catch (error) {
            console.log({ error })
        }
    }

    const renderLoader = () => {
        return (
            isLoading ?
                Array.from({ length: 10 }).map((_, index) => (
                    <TypeOfMovementSkeleton key={index} />
                ))
                : null
        );
    };

    const handleGetTypeOfMovements = async () => {
        setIsLoading(true);
        const types = await getTypeOfMovements();
        
        setTypeOfMovement(types);
        setIsLoading(false);
    }

    useEffect(() => {
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
                ListFooterComponent={renderLoader}
                onEndReachedThreshold={0}
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
        width: wp("80%")
    },
    title: {
        paddingTop: globalStyles.globalPadding.padding,
        fontSize: globalFont.font_med
    },
    optionContainer: {
        padding: globalStyles.globalPadding.padding / 1.5,
        marginBottom: globalStyles.globalMarginBottom.marginBottom,
        borderWidth: 0.7,
        borderRadius: globalStyles.borderRadius.borderRadius,
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
        paddingBottom: globalStyles.globalPadding.padding,
        backgroundColor: colores.background_color_tertiary,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: Dimensions.get('window').width,
        borderWidth: 1,
        borderColor: colores.color_border
    }
});
