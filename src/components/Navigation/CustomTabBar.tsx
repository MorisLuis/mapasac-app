import React, { useContext } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { ParamListBase, TabNavigationState, useNavigation } from '@react-navigation/native';
import { customTabBarStyles } from '../../theme/UI/customTabBarTheme';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import CustomText from '../Ui/CustumText';
import { CombineNavigationProp } from '../../navigator/AppNavigation';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';
import LayoutGrandient from '../Layouts/LayoutGrandient';

interface CustomTabBarInterface {
    Type: 'Sells' | 'Inventory' | 'Sells-Restaurant'
    renderTabButton?: (route: any, index: number) => React.JSX.Element;
    state?: TabNavigationState<ParamListBase>;
    absolute?: boolean;
}

const CustomTabBar = ({ renderTabButton, state, Type, absolute }: CustomTabBarInterface) => {
    const { numberOfItems } = useContext(InventoryBagContext);
    const { numberOfItemsSells } = useContext(SellsBagContext);

    const { actualModule } = useContext(SettingsContext);
    const { navigate } = useNavigation<CombineNavigationProp>();
    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black";

    const handleOpenBagInventory = () => {
        if (Type === 'Sells') {
            navigate('BagSellsScreen');
        } else if (Type === 'Inventory') {
            navigate('bagInventoryScreen');
        } else {
            navigate('bagInventoryScreen');
        }
    };

    const handleLayoutColor = () => {
        let color : "green" | "purple" = "green";
        if (Type === 'Sells') {
            color = "purple"
        } else if (Type === 'Inventory') {
            color = "green"
        } else {
            color = "green"
        }

        return color;
    }

    const handleGoOnboarding = () => {
        navigate("OnboardingScreen")
    };

    const renderCustumTabBar = () => {
        return (
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
                            <View style={customTabBarStyles(theme, typeTheme, actualModule).bagCounter}>
                                {
                                    actualModule === 'Sells' ?
                                        <CustomText>{parseInt(numberOfItemsSells)}</CustomText>
                                        :
                                        <CustomText>{parseInt(numberOfItems)}</CustomText>
                                }
                            </View>
                        )}
                    </View>
                </View>
            </View>
        )
    }

    return (
        <>
            {
                absolute ?
                    <SafeAreaView style={customTabBarStyles(theme).customTabBarAbsolute}>
                        {renderCustumTabBar()}
                    </SafeAreaView>
                    :
                    <LayoutGrandient color={handleLayoutColor()} locations={[1, 1]}>
                        <SafeAreaView style={customTabBarStyles(theme).customTabBar}>
                            {renderCustumTabBar()}
                        </SafeAreaView>
                    </LayoutGrandient>
            }
        </>
    );
};

export default CustomTabBar;
