import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { OnboardingScreenStyles } from '../theme/OnboardingScreenTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { getModules } from '../services/others';
import { AuthContext } from '../context/auth/AuthContext';
import { Alert } from 'react-native';
import { ModulesSkeleton } from '../components/Skeletons/ModulesSkeleton';
import { globalStyles } from '../theme/appTheme';

interface modulesInterface {
    idappmob: number,
    activo: string,
    appmob: string,
    permisos: number
}

export const OnboardingScreen = () => {

    const { theme } = useTheme();
    const { user } = useContext(AuthContext);

    const navigation = useNavigation<any>();
    const [modules, setModules] = useState<modulesInterface[]>()
    const iconColor = theme.color_primary

    useEffect(() => {
        const onGetModules = async () => {
            const modulesData = await getModules();
            setModules(modulesData);
        }

        onGetModules()
    }, [])

    return (
        <SafeAreaView style={OnboardingScreenStyles(theme).OnboardingScreen}>

            <TouchableOpacity style={OnboardingScreenStyles(theme).topbar} onPress={() => navigation.navigate("ProfileNavigation")}>
                <Icon name="person-circle-outline" size={24} color={iconColor} />
            </TouchableOpacity>

            <View style={OnboardingScreenStyles(theme).header}>
                <Text style={OnboardingScreenStyles(theme).headerTitle}>{user?.empresa?.trim()}</Text>
            </View>

            <View style={OnboardingScreenStyles(theme).content}>
                {
                    modules ?
                        modules?.map((option: modulesInterface, index: number) => (
                            index % 2 === 0 ? (
                                <View key={index}>
                                    <ModuleOption
                                        option={option}
                                        option2={modules[index + 1] || ""}
                                    />
                                </View>
                            ) : null
                        ))
                        :
                        <>
                            <ModulesSkeleton />
                            <ModulesSkeleton />
                        </>
                }
            </View>

        </SafeAreaView>
    )
}

interface ModuleOptionInterface {
    option: modulesInterface,
    option2: modulesInterface,
}

export const ModuleOption = ({
    option,
    option2,
}: ModuleOptionInterface) => {

    const { theme } = useTheme();
    const navigation = useNavigation<any>();
    const iconColor = theme.color_primary

    const moduleNavigate = (option: number) => {
        let navigate;

        if (option === 1) {
            navigation.navigate("InventoryNavigation")
        } else if (option === 2) {
            navigation.navigate("SellsNavigation")
        } else { //TEMPORAL
            //navigation.navigate("InventoryNavigation")
            Alert.alert(
                'Permiso Bloqueado',
                'El permiso no ha sido desbloqueado. Por favor, habla con el administrador.',
                [
                    { text: 'Cancelar', style: 'cancel' },
                ]
            );
        }

        return navigate
    }


    const extraStyles = (option: modulesInterface) => {
        let styles;
        let icon;

        if (option.idappmob === 1) {
            styles = { backgroundColor: option.permisos === 1 ? theme.color_red : theme.color_gray }
            icon = "scan-outline"
        } else if (option.idappmob === 2) { // TEMPORAL
            styles = { backgroundColor: option.permisos === 1 ? theme.color_blue : theme.color_gray }
            icon = "swap-horizontal-outline"
        } else { // TEMPORAL
            styles = { backgroundColor: option.permisos === 1 ? theme.color_green : theme.color_gray }
            icon = "thumbs-up-outline"
        }

        return {
            styles,
            icon
        }
    }



    return (
        <View style={OnboardingScreenStyles(theme).moduleOptionRow}>
            <TouchableOpacity
                onPress={() => moduleNavigate(option.idappmob)}
                style={[OnboardingScreenStyles(theme).moduleOption, extraStyles(option).styles]}
            >
                <Icon name={extraStyles(option).icon} size={24} color={iconColor} />
                <View>
                    <Text style={OnboardingScreenStyles(theme).optionText}>{option.appmob}</Text>
                </View>
            </TouchableOpacity>

            {
                option2 ?
                    <TouchableOpacity
                        onPress={() => moduleNavigate(option2.idappmob)}
                        style={[OnboardingScreenStyles(theme).moduleOption, extraStyles(option2).styles]}
                    >
                        <Icon name={extraStyles(option2).icon} size={24} color={iconColor} />
                        <View>
                            <Text style={OnboardingScreenStyles(theme).optionText}>{option2.appmob}</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        //onPress={() => moduleNavigate(option2.idappmob)}
                        style={[OnboardingScreenStyles(theme).moduleOption2]}
                    >
                        <View>
                        </View>
                    </TouchableOpacity>
            }
        </View>
    )
}
