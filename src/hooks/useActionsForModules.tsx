import { useContext } from "react";
import { SettingsContext } from "../context/settings/SettingsContext";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { CombineNavigationProp } from "../interface/navigation";

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
        let buttonColorNew = {
            primary: theme.color_tertiary,
            secondary: theme.color_green,
        }
    
        if (actualModule === 'Sells') {
            buttonColorNew = {
                primary: theme.color_purple,
                secondary: theme.color_purple,
            }
        }
        return buttonColorNew;
    };
    
    return {
        handleOpenBag,
        handleColorWithModule
    }
};


export default useActionsForModules;
