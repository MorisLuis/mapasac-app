import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const api = axios.create(
    {
        baseURL: 'https://seashell-app-96ulh.ondigitalocean.app/',
        headers: {
            'Content-Type': 'application/json',
        }
    }
)


/* export const api = axios.create(
    {
        baseURL: 'http://192.168.1.9:5001',
        headers: {
            'Content-Type': 'application/json',
        }
    }
)
 */

// Interceptor to add the token to headers
api.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);