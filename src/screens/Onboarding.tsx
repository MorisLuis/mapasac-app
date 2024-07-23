import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { OnboardingScreenStyles } from '../theme/OnboardingScreenTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { getModules } from '../services/others';

interface modulesInterface {
    idappmob: number,
    appmob: string
}

export const OnboardingScreen = () => {

    const { typeTheme, theme, toggleTheme } = useTheme();
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
                <Text style={OnboardingScreenStyles(theme).headerTitle}>Empresa</Text>
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
                                        color="orange"
                                    />
                                </View>
                            ) : null
                        ))
                        :
                        null
                }
            </View>
        </SafeAreaView>
    )
}

interface ModuleOptionInterface {
    option: modulesInterface,
    option2: modulesInterface,

    color: string
}

export const ModuleOption = ({
    option,
    option2,
    color,
}: ModuleOptionInterface) => {

    const { theme } = useTheme();
    const navigation = useNavigation<any>();

    const moduleNavigate = (option: number) => {
        let navigate;

        if (option === 1) {
            navigation.navigate("InventoryNavigation")
        } else if (option === 2) { //TEMPORAL
            navigation.navigate("SellsNavigation")
        } else { //TEMPORAL
            navigation.navigate("InventoryNavigation")
        }

        return navigate
    }

    const extraStyles = (option: number) => {
        let styles;
        let icon;

        if (option === 1) {
            styles = { backgroundColor: theme.color_red}
            icon = "scan-outline"
        } else if (option === 2) { //TEMPORAL
            styles = { backgroundColor: theme.color_blue}
            icon = "swap-horizontal-outline"
        } else { //TEMPORAL
            styles = { backgroundColor: theme.color_green}
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
                style={[ OnboardingScreenStyles(theme).moduleOption, extraStyles(option.idappmob).styles]}
            >
                <Icon name={extraStyles(option.idappmob).icon}size={24} color={"white"} />
                <View>
                    <Text style={OnboardingScreenStyles(theme).optionText}>{option.appmob}</Text>
                </View>
            </TouchableOpacity>

            {
                option2 ?
                <TouchableOpacity
                    onPress={() => moduleNavigate(option2.idappmob)}
                    style={[OnboardingScreenStyles(theme).moduleOption, extraStyles(option2.idappmob).styles]}
                >
                    <Icon name={extraStyles(option2.idappmob).icon} size={24} color={"white"} />
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
