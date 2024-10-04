import { View, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { ModalScreenStyles } from '../../theme/ModalRenders/ModalTheme';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../../theme/appTheme';


interface ModalScreenInterface {
    children: any;
    onClose: () => void;
}

const ModalScreen = ({
    children,
    onClose
}: ModalScreenInterface) => {

    const { theme, typeTheme } = useTheme();

    return (
        <View style={{
            //height: "110%",
            width: '100%',
            borderRadius: 10,
        }}>
            <SafeAreaView>
                <View
                    style={{
                        backgroundColor: theme.background_color,
                        //minHeight: '10%',
                        borderTopRightRadius: 10,
                        borderTopStartRadius: 10,
                        paddingHorizontal: globalStyles().globalPadding.padding,
                        paddingVertical: globalStyles().globalPadding.padding / 2,
                        borderBottomWidth: 0.2,
                        borderBottomColor: theme.color_border
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "flex-end"
                        }}
                        onPress={onClose}
                    >
                        <Icon name="close-outline" size={24} color={theme.text_color} />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        height: "100%",
                        padding: globalStyles().globalPadding.padding
                    }}
                >
                    {children}
                </View>
            </SafeAreaView>
        </View>
    )
}

export default ModalScreen