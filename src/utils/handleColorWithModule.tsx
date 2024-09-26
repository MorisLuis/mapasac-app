import { useTheme } from "../context/ThemeContext";
import { ModuleInterface } from "../interface/utils";


export const handleColorWithModule = ({ actualModule } : { actualModule : ModuleInterface['module'] }) => {
    const { theme, typeTheme } = useTheme();

    let buttonColorNew = theme.color_green;

    if (actualModule === 'Sells') {
        buttonColorNew = theme.color_purple
    };

    return buttonColorNew

}