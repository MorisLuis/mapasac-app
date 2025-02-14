import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { SettingsScreen } from '../screens/Profile/SettingsScreen';
import { CustomHeader } from '../components/Ui/CustomHeader';
import { PrivacyScreen } from '../screens/Profile/PrivacyScreen';
import { PersonalInformation } from '../screens/Profile/PersonalInformation';


export type ProfileNavigationStackParamList = {
    "[ProfileNavigation] - profile": undefined,
    "[ProfileNavigation] - personalInformationScreen": undefined;
    "[ProfileNavigation] - settingsSceen": undefined;
    "[ProfileNavigation] - privacyScreen": undefined;
}

export const ProfileNavigation = () => {

    const ProfileTabs = createNativeStackNavigator<ProfileNavigationStackParamList>();

    return (
        <ProfileTabs.Navigator>
            <ProfileTabs.Screen
                name="[ProfileNavigation] - profile"
                options={({ navigation }) => ({
                    header: props => (
                        <CustomHeader
                            {...props}
                            title="Perfil"
                            navigation={navigation}
                            back={() => navigation.goBack()}
                        />
                    )
                })}
                component={ProfileScreen}
            />

            <ProfileTabs.Screen
                name="[ProfileNavigation] - personalInformationScreen"
                component={PersonalInformation}
                options={({ navigation}) => ({
                    header: props => (
                        <CustomHeader
                            title="Información Personal"
                            navigation={navigation}
                            back={() => navigation.goBack()}
                        />)
                })}
            />

            <ProfileTabs.Screen
                name="[ProfileNavigation] - settingsSceen"
                component={SettingsScreen}
                options={({ navigation }) => ({
                    header: props => <CustomHeader title="Configuración" navigation={navigation} />,
                })}
            />

            <ProfileTabs.Screen
                name="[ProfileNavigation] - privacyScreen"
                component={PrivacyScreen}
                options={({ navigation }) => ({
                    header: props => <CustomHeader title="Aviso de privacidad" navigation={navigation} />,
                })}
            />
        </ProfileTabs.Navigator>
    )
};
