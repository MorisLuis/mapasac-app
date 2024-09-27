import { View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import CustomText from '../Ui/CustumText'
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { handleColorWithModule } from '../../utils/handleColorWithModule';
import { ProductCardSelectTheme } from '../../theme/UI/cardsStyles';

interface CardSelectInterface {
    onPress: () => void;
    message: string;
    sameValue?: boolean;
    icon?: string;

    subMessage?: string | number;
}

const CardSelect = ({
    onPress,
    message,
    sameValue,
    icon,

    subMessage
}: CardSelectInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black";
    const { actualModule } = useContext(SettingsContext);

    return (
        <TouchableOpacity
            style={[
                ProductCardSelectTheme(theme, typeTheme).CardSelect,
                sameValue && { backgroundColor: handleColorWithModule({ actualModule }) + "40" }
            ]}
            onPress={onPress}
        >
            <View style={ProductCardSelectTheme(theme, typeTheme).CardSelectInfo}>
                { icon && <Icon name={icon} size={20} color={iconColor} /> }
                <View>
                    <CustomText
                        style={[ProductCardSelectTheme(theme, typeTheme).CardSelectMessage]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {message}
                    </CustomText>

                    {
                        subMessage &&
                        <CustomText
                            style={ProductCardSelectTheme(theme, typeTheme).CardSelectSubMessage}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {subMessage}
                        </CustomText>
                    }
                </View>
            </View>

            {
                sameValue ?
                    <Icon name='checkmark-circle' size={20} color={handleColorWithModule({ actualModule })} />
                    :
                    <View style={ProductCardSelectTheme(theme, typeTheme).optionCheck}>
                    </View>
            }
        </TouchableOpacity>
    )
}

export default CardSelect