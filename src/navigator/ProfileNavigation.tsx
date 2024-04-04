import React from 'react';

import { PersonalInformation } from '../screens/Profile/PersonalInformation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { SettingsScreen } from '../screens/Profile/SettingsScreen';
import { CustomHeader } from '../components/Ui/CustomHeader';
import { PrivacyScreen } from '../screens/Profile/PrivacyScreen';
import { TermsOfUseScreen } from '../screens/Profile/TermsOfUseScreen';

export const ProfileNavigation = () => {

    const ProfileTabs = createNativeStackNavigator();

    return (
        <ProfileTabs.Navigator>
            <ProfileTabs.Screen
                name="profile"
                options={({ navigation }) => ({
                    header: props => <CustomHeader {...props} title="Perfil" navigation={navigation} backAvailable={false} />,
                })}
                component={ProfileScreen}
            />
            <ProfileTabs.Screen
                name="personalInformation"
                component={PersonalInformation}
                options={({ navigation }) => ({
                    header: props => <CustomHeader {...props} title="Información Personal" navigation={navigation} />,
                })}
            />
            <ProfileTabs.Screen
                name="settingsSceen"
                component={SettingsScreen}
                options={({ navigation }) => ({
                    header: props => <CustomHeader {...props} title="Configuración" navigation={navigation} />,
                })}
            />

            <ProfileTabs.Screen
                name="privacyScreen"
                component={PrivacyScreen}
                options={({ navigation }) => ({
                    header: props => <CustomHeader {...props} title="Aviso de privacidad" navigation={navigation} />,
                })}
            />

            <ProfileTabs.Screen
                name="termsOfUseScreen"
                component={TermsOfUseScreen}
                options={({ navigation }) => ({
                    header: props => <CustomHeader {...props} title="Terminos de uso" navigation={navigation} />,
                })}
            />
        </ProfileTabs.Navigator>
    )
};
