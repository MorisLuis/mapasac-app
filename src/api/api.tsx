import axios from 'axios';

/* export const api = axios.create(
    {
        baseURL: 'https://olei-app-gcl8n.ondigitalocean.app'
    }
) */


export const api = axios.create(
    {
        baseURL: 'http://192.168.100.117:5001'
    }
)
