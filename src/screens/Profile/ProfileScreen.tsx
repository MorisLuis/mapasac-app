import React, { useContext, useEffect } from 'react'

import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth/AuthContext';


export const ProfileScreen = () => {

    const { logOut } = useContext( AuthContext );
    const { navigate } = useNavigation<any>();

    useEffect(() => {
        console.log('Personal Information effect');
    }, [])

    const onClick = () => {
        navigate('personalInformation');
    }

    return (
        <View style={styles.ProfileScreen}>
            <Text style={styles.title}> Perfil</Text>

            <SafeAreaView style={styles.content}>
                <TouchableOpacity onPress={onClick} style={styles.section}>
                    <View>
                        <Text>Información Personal</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={logOut}>
                    <View >
                        <Text style={styles.logoutText}>Log out</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>

        </View>
    )
}


const styles = StyleSheet.create({
    ProfileScreen: {
        padding: 20,
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 20,
    },
    content:{
        display: "flex",
        flexDirection: "column",
        alignContent:"space-between",
        justifyContent: "space-between", 
        flex: 1
    },
    section: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5
    },
    logoutText: {
        color: "red",
        fontSize: 16
    }
})