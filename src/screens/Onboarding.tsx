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
import useErrorHandler from '../hooks/useErrorHandler';
import { AppNavigationProp } from '../navigator/AppNavigation';

interface modulesInterface {
    idappmob: number,
    activo: string,
    appmob: string,
    permisos: number
}

export const OnboardingScreen = () => {

    const { theme } = useTheme();
    const { user } = useContext(AuthContext);
    const { handleError } = useErrorHandler()

    const { navigate } = useNavigation<AppNavigationProp>();
    const [modules, setModules] = useState<modulesInterface[]>()

    const oddModules = modules?.filter(module => module.idappmob % 2 !== 0);
    const evenModules = modules?.filter(module => module.idappmob % 2 === 0);

    const onGetModules = async () => {

        try {
            const modulesData = await getModules();

            if (modulesData.error) {
                handleError(modulesData.error);
                return;
            };

            setModules(modulesData);
        } catch (error) {
            handleError(error);
        }

    };

    useEffect(() => {
        onGetModules()
    }, []);


    return (
        <SafeAreaView style={OnboardingScreenStyles(theme).OnboardingScreen}>

            <TouchableOpacity style={OnboardingScreenStyles(theme).topbar} onPress={() => navigate("ProfileNavigation")}>
                <View style={OnboardingScreenStyles(theme).topbar_profile}>
                    <Text style={OnboardingScreenStyles(theme).topbar_profile_text}>{user?.razonsocial?.substring(0, 1)}</Text>
                </View>
            </TouchableOpacity>

            <View style={OnboardingScreenStyles(theme).header}>
                <Text style={OnboardingScreenStyles(theme).headerTitle}>{user?.empresa?.trim()}</Text>
            </View>

            <View style={OnboardingScreenStyles(theme).content}>
                {
                    modules ?
                        oddModules?.map((option, index) => (
                            <View key={option.idappmob}>
                                <ModuleOption
                                    option={option}
                                    option2={evenModules && evenModules[index]}
                                />
                            </View>
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
    option2?: modulesInterface,
}

export const ModuleOption = ({
    option,
    option2,
}: ModuleOptionInterface) => {

    const { theme, typeTheme } = useTheme();
    const { navigate } = useNavigation<AppNavigationProp>();
    const iconColor = typeTheme === 'light' ? theme.color_primary : theme.text_color_secondary

    const moduleNavigate = (option: number) => {

        if (option === 1) {
            navigate("InventoryNavigation")
        } else if (option === 2) {
            navigate("SellsNavigation")
        } else { //TEMPORAL
            Alert.alert(
                'Permiso Bloqueado',
                'El permiso no ha sido desbloqueado. Por favor, habla con el administrador.',
                [
                    { text: 'Cancelar', style: 'cancel' },
                ]
            );
        }

    }

    const extraStyles = (option: modulesInterface) => {
        let styles;
        let icon;

        if (option.idappmob === 1) {
            styles = { backgroundColor: option.permisos === 1 ? theme.color_tertiary : theme.color_gray }
            icon = "scan-outline"
        } else if (option.idappmob === 2) { // TEMPORAL
            styles = { backgroundColor: option.permisos === 1 ? theme.color_tertiary : theme.color_gray }
            icon = "swap-horizontal-outline"
        } else { // TEMPORAL
            styles = { backgroundColor: option.permisos === 1 ? theme.color_tertiary : theme.color_gray }
            icon = "thumbs-up-outline"
        }

        return {
            styles,
            icon
        }
    }

    return (
        <View style={OnboardingScreenStyles(theme, typeTheme).moduleOptionRow}>
            <TouchableOpacity
                onPress={() => moduleNavigate(option.idappmob)}
                style={[OnboardingScreenStyles(theme, typeTheme).moduleOption, extraStyles(option).styles]}
            >
                <Icon name={extraStyles(option).icon} size={24} color={iconColor} />
                <View>
                    <Text style={OnboardingScreenStyles(theme, typeTheme).optionText}>{option.appmob}</Text>
                </View>
            </TouchableOpacity>

            {
                option2 ?
                    <TouchableOpacity
                        onPress={() => moduleNavigate(option2.idappmob)}
                        style={[OnboardingScreenStyles(theme, typeTheme).moduleOption, extraStyles(option2).styles]}
                    >
                        <Icon name={extraStyles(option2).icon} size={24} color={iconColor} />
                        <View>
                            <Text style={OnboardingScreenStyles(theme, typeTheme).optionText}>{option2.appmob}</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        //onPress={() => moduleNavigate(option2.idappmob)}
                        style={[OnboardingScreenStyles(theme, typeTheme).moduleOption2]}
                    >
                        <View>
                        </View>
                    </TouchableOpacity>
            }
        </View>
    )
}
