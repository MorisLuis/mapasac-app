import { useContext } from "react";
import { SettingsContext } from "../context/settings/SettingsContext";
import { useNavigation } from "@react-navigation/native";
import { CombineNavigationProp } from "../navigator/AppNavigation";
import { useTheme } from "../context/ThemeContext";

export const useActionsForModules = () => {

    const { actualModule } = useContext(SettingsContext);
    const { navigate } = useNavigation<CombineNavigationProp>();
    const { theme } = useTheme();

    const handleOpenBag = () => {
        if (actualModule === 'Sells') {
            navigate('BagSellsScreen');
        } else if (actualModule === 'Inventory') {
            navigate('bagInventoryScreen');
        }
    };

    const handleColorWithModule = () => {
        let buttonColorNew = theme.color_tertiary; 
    
        if (actualModule === 'Sells') {
            buttonColorNew = theme.color_purple; 
        }
        return buttonColorNew;
    };
    
    return {
        handleOpenBag,
        handleColorWithModule
    }
};


export default useActionsForModules;
