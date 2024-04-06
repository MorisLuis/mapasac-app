import axios from 'axios';

/* export const api = axios.create(
    {
        baseURL: 'https://seahorse-app-spuvc.ondigitalocean.app/'
    }
) */



export const api = axios.create(
    {
        baseURL: 'http://192.168.1.3:5001'
    }
)
