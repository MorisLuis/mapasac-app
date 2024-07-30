import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import ModalBottom from '../../components/Modals/ModalBottom';
import { ProductSellsFamilyInterface } from '../../interface/productSells';
import { SellsFamilyScreenStep1 } from './SellsFamilyScreenStep1';
import { SellsFamilyScreenStep2 } from './SellsFamilyScreenStep2';
import { de } from 'date-fns/locale';

interface SellsFamilyScreenInterface {
    route?: {
        params: {
            cvefamilia?: number;
            descripcio?: string
        };
    };
}

export const SellsFamilyScreen = ({ route }: SellsFamilyScreenInterface) => {

    const { cvefamilia, descripcio } = route?.params ?? {};

    const navigation = useNavigation<any>();
    const [page, setPage] = useState(0)


    const handleMoveForward =  () => {
        //setPage(page + 1)
    }

    const handleBack = () => {
        setPage(page - 1)
    }


    return (
        <ModalBottom
            visible={true}
            onClose={() => navigation.goBack()}
        >

            <SellsFamilyScreenStep1 visible={page === 0} move={handleMoveForward} back={handleBack} cvefamilia={cvefamilia} descripcio={descripcio}/>
            <SellsFamilyScreenStep2 visible={page === 1} move={handleMoveForward} back={handleBack}/>

        </ModalBottom>
    )
};
