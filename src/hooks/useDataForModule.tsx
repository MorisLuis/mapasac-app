import { useContext } from "react";
import { SettingsContext } from "../context/settings/SettingsContext";
import { InventoryBagContext } from "../context/Inventory/InventoryBagContext";
import { SellsBagContext } from "../context/Sells/SellsBagContext";

export const useDataForModule = () => {
    const { actualModule } = useContext(SettingsContext);
    const { numberOfItems } = useContext(InventoryBagContext);
    const { numberOfItemsSells } = useContext(SellsBagContext);

    // Number of items in bag ( used in CustomTabBar ).
    const numberOfItemsToDisplay = actualModule === "Sells"
        ? numberOfItemsSells ?? "0"
        : actualModule === "Inventory"
        ? numberOfItems ?? "0"
        : "0";

    // Data showed in 'SuccesMessage'.
    const { title, text } = actualModule === 'Inventory'
        ? { title: 'Inventario realizado', text: 'Inventario' }
        : { title: 'Venta realizada', text: 'Venta' };

    // Retornar ambos valores calculados
    return {
        numberOfItems: numberOfItemsToDisplay,
        movementInfo: {
            title,
            text
        }
    };
};

export default useDataForModule;
