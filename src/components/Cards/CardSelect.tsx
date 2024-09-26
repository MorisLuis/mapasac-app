import { View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import CustomText from '../Ui/CustumText'
import { SelectScreenTheme } from '../../theme/SelectScreenTheme'
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { handleColorWithModule } from '../../utils/handleColorWithModule';

interface CardSelectInterface {
    onPress: () => void;
    message: string;
    sameValue?: boolean;
    icon?: string;
}

const CardSelect = ({
    onPress,
    message,
    sameValue,
    icon
}: CardSelectInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"
    const { actualModule } = useContext(SettingsContext);

    // Modify the color of the button depends of the module.
    /* const modifyButtonColor = () => {
        let buttonColorNew: string = theme.color_primary;

        if (actualModule === 'Sells') {
            buttonColorNew = theme.color_purple
        } else if (actualModule === 'Inventory') {
            buttonColorNew = theme.color_tertiary
        }

        return buttonColorNew
    } */

    return (
        <TouchableOpacity
            style={[
                SelectScreenTheme(theme, typeTheme).optionsContainer,
                sameValue && { backgroundColor: handleColorWithModule({ actualModule }) + "40" }
            ]}
            onPress={onPress}
        >
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, maxWidth: "90%" }}>
                {
                    icon &&
                    <Icon
                        name={icon}
                        size={20}
                        color={iconColor}
                    />
                }
                <CustomText
                    style={[SelectScreenTheme(theme, typeTheme).optionText]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {message}
                </CustomText>
            </View>

            {
                sameValue ?
                    <Icon name='checkmark-circle' size={20} color={handleColorWithModule({ actualModule })} />
                    :
                    <View style={SelectScreenTheme(theme, typeTheme).optionCheck}>
                    </View>
            }
        </TouchableOpacity>
    )
}

export default CardSelect