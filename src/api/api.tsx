import axios from 'axios';

/* export const api = axios.create(
    {
        baseURL: 'https://olei-app-gcl8n.ondigitalocean.app'
    }
) */


export const api = axios.create(
    {
        baseURL: 'http://192.168.1.3:5001'
    }
)
