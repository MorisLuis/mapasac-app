import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { globalFont } from '../theme/appTheme'
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
        minHeight: 50,
        //width: f,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        maxWidth: "90%"
    },
    icon: {
        marginRight: 5
    },
    message: {
        fontSize: globalFont.font_normal
        //flex: 1
    }
})