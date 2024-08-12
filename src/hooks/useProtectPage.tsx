import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

// Define el tipo de tus parámetros si es necesario
interface UseProtectPageProps {
    numberOfItems?: string;
    anotherCondition?: any;
    loading?: boolean;
    navigatePage: string
}

export const useProtectPage = ({
    numberOfItems,
    anotherCondition,
    loading,
    navigatePage
}: UseProtectPageProps) => {

    const { navigate, goBack } = useNavigation<any>();
    const navigation = useNavigation<any>();

    const protectThisPage = (numberOfItems && parseFloat(numberOfItems) <= 0 && !loading) ? true : false;
    const protectThisPage2 = anotherCondition;

    useFocusEffect(
        useCallback(() => {
            const checkAccess = async () => {
                if( navigatePage === 'back' ) {
                    return navigation.canGoBack() ? navigation.canGoBack?.() : navigation.navigate('OnboardingScreen')
                }

                if (protectThisPage) {
                    return navigate(navigatePage);
                }

                if (protectThisPage2) {
                    return navigate(navigatePage);
                }
            };
            checkAccess();
        }, [protectThisPage, protectThisPage2,navigate])
    );

    return {
        protectThisPage: protectThisPage ? protectThisPage : protectThisPage2
    }
};
