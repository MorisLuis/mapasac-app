import { api } from "../api/api";


export const getBriefProductsStatistics = async () => {

    let statistics;
    try {
        const getStatistics = await api.get(`/api/statistics/resume`);
        statistics = getStatistics.data;

    } catch (error: any) {
        console.log({ error: error })
    }

    return statistics

}

export const getProductsStatistics = async ({
    path,
    page
}: any) => {
    let statistics;

    try {
        const getStatistics = await api.get(`/api/statistics/?path=${path}&PageNumber=${page}&PageSize=20`);
        statistics = getStatistics.data;

    } catch (error: any) {
        console.log({ error: error })
    }

    return statistics
}