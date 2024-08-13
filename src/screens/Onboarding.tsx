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

    useEffect(() => {
        const onGetModules = async () => {
            const modulesData = await getModules();
            setModules(modulesData);
        }

        onGetModules()
    }, []);


    const oddModules = modules?.filter(module => module.idappmob % 2 !== 0);
    const evenModules = modules?.filter(module => module.idappmob % 2 === 0);

    return (
        <SafeAreaView style={OnboardingScreenStyles(theme).OnboardingScreen}>

            <TouchableOpacity style={OnboardingScreenStyles(theme).topbar} onPress={() => navigation.navigate("ProfileNavigation")}>
                <View style={OnboardingScreenStyles(theme).topbar_profile}>
                    {/* <Icon name="person-circle-outline" size={wp("7.5%")} color={iconColor} /> */}
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
    const navigation = useNavigation<any>();
    const iconColor = typeTheme === 'light' ? theme.color_primary : theme.text_color_secondary

    const moduleNavigate = (option: number) => {
        let navigate;

        if (option === 1) {
            navigation.navigate("InventoryNavigation")
        } else if (option === 2) {
            navigation.navigate("SellsNavigation")
        } else { //TEMPORAL
            Alert.alert(
                'Permiso Bloqueado',
                'El permiso no ha sido desbloqueado. Por favor, habla con el administrador.',
                [
                    { text: 'Cancelar', style: 'cancel' },
                ]
            );
        }

        return navigate;
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
