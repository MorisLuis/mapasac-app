import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

// Define el tipo de tus parámetros si es necesario
interface UseProtectPageProps {
    numberOfItems: string;
    loading: boolean;
    navigatePage: string
}

export const useProtectPage = ({ numberOfItems, loading, navigatePage }: UseProtectPageProps) => {
    const protectThisPage = parseFloat(numberOfItems) <= 0 && !loading;
    const { navigate } = useNavigation<any>();

    useFocusEffect(
        useCallback(() => {
            const checkAccess = async () => {
                if (protectThisPage) {
                    navigate(navigatePage);
                }
            };
            checkAccess();
        }, [protectThisPage, navigate])
    );

    return {
        protectThisPage
    }
};
