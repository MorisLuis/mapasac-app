import axios from 'axios';

/* export const api = axios.create(
    {
        baseURL: 'https://seahorse-app-spuvc.ondigitalocean.app/'
    }
) */



export const api = axios.create(
    {
        baseURL: 'http://192.168.100.100:5001'
    }
)
