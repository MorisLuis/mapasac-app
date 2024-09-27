import { useTheme } from "../context/ThemeContext";
import { ModuleInterface } from "../interface/utils";


export const handleColorWithModule = ({ actualModule } : { actualModule : ModuleInterface['module'] }) => {

    let buttonColorNew = 'green'

   /*  if (actualModule === 'Sells') {
        buttonColorNew = theme.color_purple
    }; */

    return buttonColorNew

}