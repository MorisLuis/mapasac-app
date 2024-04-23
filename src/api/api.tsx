import axios from 'axios';

export const api = axios.create(
    {
        baseURL: 'https://seahorse-app-spuvc.ondigitalocean.app/',
        headers: {
            'Content-Type': 'application/json',
        }
    }
)












/* export const api = axios.create(
    {
        baseURL: 'http://172.20.10.3:5001',
        headers: {
            'Content-Type': 'application/json',
        }
    }
)
 */