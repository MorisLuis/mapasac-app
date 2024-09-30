import { useContext } from 'react';
import { SettingsContext } from '../context/settings/SettingsContext';
import { ProductSellsInterface, ProductSellsRestaurantInterface } from '../interface/productSells';
import { format } from '../utils/currency';
import { quantityFormat } from '../utils/quantityFormat';

type CombinedProductInterface = ProductSellsInterface | ProductSellsRestaurantInterface;

export const useProductDetails = (product: CombinedProductInterface) => {
    const { actualModule } = useContext(SettingsContext);

    const formattedPrice = format(
        typeof product.precio === 'number' ? product.precio : parseFloat(product.precio as string)
    );

    const totalImporte = format(
        (typeof product.precio === 'number' ? product.precio : parseFloat(product.precio as string)) *
        (product.cantidad ?? 0)
    );

    const capa = product?.capa?.trim();
    const clase = (product as ProductSellsInterface)?.clase?.trim();

    let productDetails: { label: string, value: string }[] = [];

    // Detalles comunes a ambos módulos
    productDetails = [
        { label: 'Precio', value: `${formattedPrice} / ${quantityFormat(product.cantidad ?? 0)}` },
        { label: 'Importe', value: totalImporte }
    ];

    // Agregar detalles específicos del módulo
    if (actualModule === 'Sells') {
        productDetails.push(
            ...(capa ? [{ label: 'Capa', value: capa }] : []),
            ...(clase ? [{ label: 'Clase', value: clase }] : [])
        );
    }

    return {
        productDetails
    };
};
