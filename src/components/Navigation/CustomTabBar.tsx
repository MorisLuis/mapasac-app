import React, { useContext } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { ParamListBase, TabNavigationState, useNavigation } from '@react-navigation/native';
import { customTabBarStyles } from '../../theme/UI/customTabBarTheme';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import CustomText from '../Ui/CustumText';
import { CombineNavigationProp } from '../../navigator/AppNavigation';



interface CustomTabBarInterface {
    Type: 'Sells' | 'Inventory' | 'Sells-Restaurant'
    renderTabButton?: (route: any, index: number) => React.JSX.Element;
    state?: TabNavigationState<ParamListBase>;
}

const CustomTabBar = ({ renderTabButton, state, Type }: CustomTabBarInterface) => {
    const { numberOfItems } = useContext(InventoryBagContext);
    const { navigate } = useNavigation<CombineNavigationProp>();
    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black";

    const handleOpenBagInventory = () => {
        if( Type === 'Sells') {
            navigate('BagSellsScreen');
        } else if ( Type === 'Inventory' ) {
            navigate('bagInventoryScreen');
        } else  {
            navigate('bagInventoryScreen');
        }
    };

    const handleGoOnboarding = () => {
        navigate("OnboardingScreen")
    }

    return (
        <SafeAreaView style={customTabBarStyles(theme).customTabBar}>
            <View style={customTabBarStyles(theme).content}>

                <View style={customTabBarStyles(theme).content_left}>
                    <TouchableOpacity onPress={handleGoOnboarding} style={customTabBarStyles(theme).buttonBack}>
                        <Icon name="arrow-back-outline" size={20} color={iconColor} />
                    </TouchableOpacity>

                    {
                        (state && renderTabButton) &&
                        <View style={customTabBarStyles(theme).navigation}>
                            {state.routes.map(renderTabButton)}
                        </View>
                    }
                </View>

                <View style={customTabBarStyles(theme).content_right}>
                    <View style={customTabBarStyles(theme, typeTheme).buttonBag}>
                        <TouchableOpacity onPress={handleOpenBagInventory}>
                            <Icon name="albums-outline" size={22} color={iconColor} />
                        </TouchableOpacity>
                        {parseInt(numberOfItems) > 0 && (
                            <View style={customTabBarStyles(theme, typeTheme).bagCounter}>
                                <CustomText>{parseInt(numberOfItems)}</CustomText>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CustomTabBar;
