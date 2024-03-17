import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colores, globalFont, globalStyles } from '../theme/appTheme'
import { buttonStyles } from '../theme/UI/buttons'
import Icon from 'react-native-vector-icons/Ionicons';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'pink' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400'
            }}
        />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: 17
            }}
            text2Style={{
                fontSize: 15
            }}
        />
    ),

    tomatoToast: ({ text1, props }: any) => (
        <View style={styles.ToastMessage}>
            <Icon name="checkmark-circle" size={24} color="yellowgreen" style={styles.icon}/>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.message}>
                {text1}
            </Text>            
            <Text>{props.uuid}</Text>
        </View>
    )
};



export const ShowToastMessage = () => {

    return <Toast config={toastConfig} />
}


const styles = StyleSheet.create({
    ToastMessage: {
        height: 60,
        width: '80%',
        backgroundColor: colores.background_color_secondary,
        borderWidth: 1,
        borderColor: colores.color_border,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    icon: {
        marginRight: 10
    },
    message: {
        flex: 1
    }
})