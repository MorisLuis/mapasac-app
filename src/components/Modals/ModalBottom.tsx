import React from 'react';
import { Modal, View, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalBottomStyles } from '../../theme/ModalRenders/ModalBottomTheme';
import { useTheme } from '../../context/ThemeContext';
import CustomText from '../Ui/CustumText';
import useActionsForModules from '../../hooks/useActionsForModules';

interface ModalBottomInterface {
    visible: boolean;
    onClose: () => void;
    children: any;

    blurNotAvailable?: boolean;
    blurType?: any;
    blurAmount?: number;

    //Menu
    showMenu?: boolean;
    menuOptions?: {
        label: string;
        value: number;
    }[];
    menuOptionActive?: Number;
    onNavigateMenu?: (value: Number) => void
}

const ModalBottom = ({
    visible,
    onClose,
    children,

    blurNotAvailable = false,
    showMenu,
    menuOptions,
    menuOptionActive,
    onNavigateMenu
}: ModalBottomInterface) => {

    const { theme, typeTheme } = useTheme();
    const { handleColorWithModule } = useActionsForModules()
    const iconColor = typeTheme === 'dark' ? "white" : "black";

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const renderMenu = () => {
        const visible = menuOptionActive && onNavigateMenu;
        return visible && (
            <View style={ModalBottomStyles(theme).menuModal}>
                {
                    menuOptions?.map((item) =>
                        <TouchableOpacity
                            onPress={() => onNavigateMenu?.(item.value)}
                            key={item.value}
                            style={[ ModalBottomStyles(theme).menuModalOption, {
                                backgroundColor: menuOptionActive === item.value ? handleColorWithModule.primary : theme.background_color,
                            }]}
                        >
                            <CustomText>{item.label}</CustomText>
                        </TouchableOpacity>
                    )
                }
            </View>
        )
    }

    const render = () => {
        return (
            <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={ModalBottomStyles(theme).modalBottom}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            keyboardVerticalOffset={Platform.select({ ios: 60, android: 60 })}
                        >
                            <View style={ModalBottomStyles(theme, typeTheme).modalContent}>
                                <TouchableWithoutFeedback onPress={onClose}>
                                    <TouchableOpacity style={ModalBottomStyles(theme, typeTheme).header} onPress={onClose}>
                                        <Icon name="close-outline" size={24} color={iconColor} />
                                    </TouchableOpacity>
                                </TouchableWithoutFeedback>
                                <View style={ModalBottomStyles(theme).modalChildren}>
                                    {children}
                                </View>
                            </View>
                            {showMenu && renderMenu()}
                        </KeyboardAvoidingView>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        )
    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            {
                blurNotAvailable ?
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.15)' }}>
                        {render()}
                    </View>
                    :
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.15)' }} >
                        {render()}
                    </View>
            }
        </Modal>
    );
};

export default ModalBottom;

