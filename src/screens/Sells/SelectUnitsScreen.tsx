import React, { useRef, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { buttonStyles } from '../../theme/UI/buttons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SelectScreenTheme } from '../../theme/SelectScreenTheme';
import { getUnits } from '../../services/productsSells';
import UnitInterfacce, { UnitData } from '../../interface/units';
import { SellsNavigationStackParamList } from '../../navigator/SellsNavigation';

type SelectUnitScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Modal] - UnitScreen'>;


interface SelectAmountScreenInterface {
    route: SelectUnitScreenRouteProp
}

export const SelectUnitScreen = ({
    route
}: SelectAmountScreenInterface) => {
    const { theme, typeTheme } = useTheme();
    const { valueDefault } = route?.params;
    const navigation = useNavigation<any>();

    const inputRef = useRef<TextInput>(null);
    const [value, setValue] = useState<UnitData>();
    const [units, setUnits] = useState<UnitInterfacce[]>()
    const [optionSelected, setOptionSelected] = useState<UnitData>()
    const buttondisabled = false;

    const handleSelectOption = (value: UnitData) => {
        setValue(value);
        setOptionSelected(value)
    };

    const handleSave = () => {
        navigation.navigate('SellsDataScreen', {
            units: {
                unidad: value?.unidad as number,
                descripcio: value?.descripcio?.trim() as string
            }
        });
    };

    const renderItem = ({ item }: { item: UnitInterfacce }) => {
        return (
            <TouchableOpacity style={[SelectScreenTheme(theme, typeTheme).optionsContainer]} onPress={() => handleSelectOption(item)}>
                <Text style={SelectScreenTheme(theme, typeTheme).optionText}>{item.descripcio.trim()} / {item?.abrevia}</Text>
                <View style={[optionSelected?.unidad === item.idinveunid ? SelectScreenTheme(theme, typeTheme).optionCheckActive : SelectScreenTheme(theme, typeTheme).optionCheck]}></View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        setValue(valueDefault);
        setOptionSelected(valueDefault)

        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const handleGetClasess = async () => {
            const unitsData = await getUnits();
            setUnits(unitsData)
        };
        handleGetClasess();
    }, []);


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
        >
            {
                units ?
                    <View style={SelectScreenTheme(theme, typeTheme).SelectScreen}>
                        <View style={SelectScreenTheme(theme, typeTheme).header}>
                            <Text style={SelectScreenTheme(theme, typeTheme).headerTitle}>Selecciona la unidad.</Text>
                        </View>

                        <FlatList
                            data={units}
                            renderItem={renderItem}
                            keyExtractor={product => `${product.idinveunid}`}
                            onEndReachedThreshold={0}
                        />

                        <View style={{ paddingBottom: Platform.select({ ios: "20%", android: "20%" }) }}>
                            <TouchableOpacity
                                style={[buttonStyles(theme).button, buttonStyles(theme).yellow, { display: 'flex', flexDirection: 'row' }, ...(buttondisabled ? [buttonStyles(theme).disabled] : [])]}
                                onPress={handleSave}
                                disabled={buttondisabled}
                            >
                                <Text style={buttonStyles(theme, typeTheme).buttonTextSecondary}>Agregar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={SelectScreenTheme(theme, typeTheme).SelectScreen}>
                        <View style={SelectScreenTheme(theme, typeTheme).header}>
                            <Text>Cargando...</Text>
                        </View>
                    </View>
            }
        </KeyboardAvoidingView>
    );
};
